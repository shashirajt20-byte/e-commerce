//@ts-nocheck

import CartContextProvider from "../components/cartContext";
import Footer from "../components/footer";
import Header from "../components/header";
import ThemeContext from "../components/themeContext";
import { AuthContextProvider } from "../context/authContext";
import prisma from "../services/prismaClient";

export default async function Layout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal?: React.ReactNode;
}>) {
    const cartItems = await prisma.product.findMany();
    return (
        <ThemeContext>
            <AuthContextProvider>
                <CartContextProvider initialCartItems={cartItems}>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        {/* 👇 Ye part stretch hoga between header and footer */}
                        <main className="flex-grow">{children}</main>
                        {/* 👇 Footer hamesha bottom pe rahega */}
                        <Footer />
                    </div>
                </CartContextProvider>
            </AuthContextProvider>
        </ThemeContext>

    )
}