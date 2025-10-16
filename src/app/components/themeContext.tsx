//@ts-nocheck
'use client'
import { Theme } from "@radix-ui/themes";
import { createContext, useEffect, useState } from "react";

export const context = createContext();

export default function ThemeContext({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") setIsDark(true);
        else if (savedTheme === "light") setIsDark(false);
        setMounted(true);

    }, []);

    // 👇 Whenever theme changes, save it to localStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        }
    }, [isDark, mounted]);
    if (!mounted) return null;
    return (
        <context.Provider value={{ isDark, setIsDark }}>
            <Theme appearance={isDark ? "dark" : "light"}>
                {children}
            </Theme>
        </context.Provider>
    )
}