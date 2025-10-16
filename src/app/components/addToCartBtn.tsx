//@ts-nocheck
'use client'
import { Button } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { CartContext } from "./cartContext";
import { addProdToCart } from "../actions/prodAction";
import { AuthContext } from "../context/authContext";
import { redirect } from "next/navigation";


export default function AddToCartBtn({item}) {
    const{cart, setCart} = useContext(CartContext)
    const{user, setUser} = useContext(AuthContext)
    const[inCart, setInCart] = useState(false);
    async function handleAdd(){
        // let cart = JSON.parse(localStorage.getItem("cart"))||[];;
        // cart.push(item);
        // localStorage.setItem("cart", JSON.stringify(cart));
        // setInCart(true);
        // alert("Item Added to Cart!");

        // const newCart = [...cart];
        // newCart.push(item);
        // setCart(newCart);
        if(!user){
            redirect("/signin")
        }
        const res = await addProdToCart(item);
        if(res.success){
            setCart(prev => [...prev, { ...item, quantity: 1 }]);
            setInCart(true);
           
            // alert(res.message);
        }else{
            alert(res.message)
        }
    }
    return (
        <div>
            {
                inCart? <button color="gray" variant="classic">This item is in your cart</button> : <button onClick={handleAdd} className="bg-amber-500 w-full md:w-80 rounded mx-auto">
                Add To Cart
            </button>
            }
        </div>
    )
}