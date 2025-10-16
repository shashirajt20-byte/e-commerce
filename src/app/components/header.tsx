//@ts-nocheck
'use client'
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddProd from "./addProdBtn";
import { signOut } from "../actions/prodAction";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import UserDropDown from "./user-dropdown";
import Link from "next/link";

export default function Header() {
    const [userInput, setUserInput] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const router = useRouter();

    function handleChange(e) {
        setUserInput(e.target.value);
    }


    // Logic for search suggestion in input field
    useEffect(function () {
        async function getProds() {
            const response = await fetch("http://localhost:3000/api/product");
            const data = await response.json();
            const products = data?.data || [];


            const filterSuggestion = products.filter(function (item) {
                return item.title.toLowerCase().includes(userInput.toLowerCase())
            })
            setSuggestion(filterSuggestion.slice(0, 10));
        }
        if (userInput) {
            getProds();
        }
        else {
            setSuggestion([]);
        }
    }, [userInput])

    function returnPage() {
        router.push("/returnOrderHistory")
    }

    function goToSigninPage() {
        router.push("/profile")
    }

    function handleGo() {
        router.push("/cart");
    }
    return (
        <div>
            <div className="hidden md:flex bg-slate-800 text-white overflow- md:h-17" style={{
                // display: "flex",
                flexWrap: "wrap",
                // height: "65px",
                padding: 10,
                justifyContent: "space-between",
                gap: 15
            }}>
                <div className="">
                    <div>
                        <h1 className="md:font-extrabold md:text-3xl font-bold mt-2">Ecom.in</h1>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="text-sm">
                        Delivering to New Delhi 110002
                    </div>
                    <div className="font-bold ">
                        Update your location
                    </div>
                </div>
                <div className="relative flex-grow min-w-[100px] p-2 ">
                    <form action="/search" method="GET">
                        <div className="w-full" style={{ display: "flex", flexWrap: "wrap" }}>
                            <input className="flex-grow bg-white text-black h-9 p-3 rounded outline-none" type="text" placeholder="Search Products ..." onChange={handleChange} value={userInput} name="q" />
                            <button className="bg-amber-200 text-black font-bold mx-auto"><svg width="30" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button>
                        </div>
                    </form>
                    <div className="text-black w-full  border border-black " style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "white",
                        position: "absolute",
                        zIndex: 1000
                    }}>
                        {
                            suggestion.map(function (elem) {
                                return (
                                    <div key={elem.id} onClick={()=>setSuggestion([])}>
                                            <Link href={`/search?q=${encodeURIComponent(elem.title)}`}>
                                                <h2>{elem.title}</h2>
                                            </Link>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="hidden md:block">
                    <button onClick={goToSigninPage}>
                        <div className="text-sm">Hello, Sign in</div>
                        <div className="font-bold">
                            Accounts & Lists
                        </div>
                    </button>
                </div>
                <div className="hidden md:block text-sm" >
                    <button onClick={returnPage}>
                        <div>
                            Return
                        </div>
                        <div className="font-bold">
                            & Orders
                        </div>
                    </button>
                </div>
                <Flex className="" gap="20px">
                    <div className="hidden md:block mt-1">
                        <Button onClick={handleGo} style={{ padding: "10px" }} color="orange" variant="soft">
                            <ShoppingCart />Cart
                        </Button>
                    </div>
                    <div className="mt-2">
                        <UserDropDown />
                    </div>
                </Flex>
            </div>
            {/* mobile header */}
            <div className="block md:hidden bg-slate-900 text-white">
                <div className="flex justify-between items-center p-2 ">
                    <div>
                        <h1 className=" font-bold mt-2 text-2xl">Ecom.in</h1>
                    </div>
                    <div>
                        <div className="flex gap-2 mt-1">
                            <Button onClick={handleGo} style={{ padding: "10px" }} color="orange" variant="soft">
                                <ShoppingCart />Cart
                            </Button>
                            <div className="mt-1">
                                <UserDropDown />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="relative flex-grow min-w-[100px] p-3 ">
                        <form action="/search" method="GET">
                            <div className="w-full " style={{ display: "flex", flexWrap: "wrap" }}>
                                <input className="flex-grow bg-white text-black h-9 p-3 rounded outline-none" type="text" placeholder="Search Products ..." onChange={handleChange} value={userInput} name="q" />
                                <button className="bg-amber-200 text-black font-bold mx-auto"><svg width="30" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button>
                            </div>
                        </form>

                        <div className="text-black w-full border border-black " style={{
                            display: "flex",
                            flexDirection: "column",
                            background: "white",
                            position: "absolute",
                            zIndex: 1000
                        }}>
                            {
                                suggestion.map(function (elem) {
                                    return (
                                        <div key={elem.id} onClick={()=>setSuggestion([])}>
                                            <Link href={`/search?q=${encodeURIComponent(elem.title)}`}>
                                                <h2>{elem.title}</h2>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-slate-700 p-2">
                    <div className="flex text-xs ml-1.5">
                        Delivering to New Delhi 110002 - Update locatioon
                    </div>
                </div>
            </div>
        </div>
    )
}