'use client'
import { useState } from "react"
import { signIn } from "../../actions/prodAction";
import { redirect, useRouter } from "next/navigation";
import { Button, Card, TextField } from "@radix-ui/themes";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit() {
        const data = {
            email,
            password
        }
        const res = await signIn(data);
        if (res.success) {
            redirect("/")
        }
        else {
            setError(res.message)
        }
    }
    const router = useRouter();
    function handleClick() {
        router.push("/signup/")
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <Card style={{
                display: "flex",
                flexDirection: "column",
                // borderWidth: "1px",
                // borderColor: "solid-black",
                // flexWrap: "wrap",
                // justifyContent: "center",
                width: 300,
                // height: 300,
                gap: 15,
                padding : 30
                // alignItems: "center"
            }}>
                <TextField.Root type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                <TextField.Root type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                <h2 className="text-red-600">{error}</h2>
                
                    <Button onClick={handleSubmit} style={{
                        borderWidth : "1px solid-black"
                    }}>SignIn</Button>
                    <Button style={{
                        borderWidth:"1px solid-black"
                    }} onClick={handleClick}>Sign Up</Button>
                
            </Card>
        </div>

    )
}