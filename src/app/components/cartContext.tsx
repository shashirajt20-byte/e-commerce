//@ts-nocheck
'use client'
import { createContext, useState } from "react"
import Header from "./header";
import Footer from "./footer";

export const CartContext = createContext();
export default function CartContextProvider({
    children,
    initialCartItems
}) {
    const [cart, setCart] = useState([]);
    return (

        <CartContext.Provider value={{
            cart, setCart
        }}>
            
            {children}
            
        </CartContext.Provider>

    )
}