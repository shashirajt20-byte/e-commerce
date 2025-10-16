//@ts-nocheck
'use client'
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/app/components/cartContext";
import { deleteFromCart, updateQuantity } from "@/app/actions/prodAction";
import ItemCard from "@/app/components/itemCard";
import { AuthContext } from "@/app/context/authContext";
import prisma from "@/app/services/prismaClient";
import { redirect, useRouter } from "next/navigation";
import { getCookie } from "@/app/utils/cookieHelper";

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const { user, setUser } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const token = getCookie("token");
        if (!user && !token) {
            router.push("/signin")
        }
    }, [user])

    useEffect(() => {
        if (!user?.id) return;
        const fetchdata = async () => {
            try {
                const res = await fetch(`/api/cart?userId=${user?.id}`, {
                    cache: "no-store",
                });
                const data = await res.json();
                setCartData(data?.data || []);
            } catch (error) {
                console.log("Error caused by : ", error);
            }
        }
        fetchdata();
    }, [user])

    async function handleDelete(id) {
        const newCart = cartData.filter(item => {
            return item.id !== id
        })
        setCartData(newCart)
        setCart(newCart);
        const res = await deleteFromCart(id);
    }

    async function handleQuantity(id, quantity) {
        if (quantity < 1) return;
        if (!user) {
            redirect("/signin")
        }
        const items = cartData.map((prod) => {
            if (prod.id === id) {
                return {
                    ...prod,
                    quantity
                }
            }
            return prod
        })
        setCartData(items)
        setCart(items)
        const res = await updateQuantity(id, quantity);
    }

    return (
        <main>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
                padding: 10
            }}>
                {
                    cartData && cartData.length > 0 ? (
                        cartData && cartData?.map((item) => {
                        return (
                            <div key={item.id}>
                                <ItemCard item={item.product} />
                                <button className="font-bold" onClick={() => handleQuantity(item.id, item.quantity - 1)}>-</button>
                                <p>Quantity : {item.quantity}</p>
                                <button className="font-bold" onClick={() => handleQuantity(item.id, item.quantity + 1)}>+</button>
                                <button className="bg-amber-400 p-0.5 w-20 ml-2 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        ) 
                    })
                    ) : (
                        <h1 className="font-bold text-sm md:text-2xl">You have not saved any product in cart yet!</h1>
                    )
                }
            </div>
        </main>
    )
}