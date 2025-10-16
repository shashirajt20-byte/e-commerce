'use client'
import { useState } from "react"
import { signUp } from "../../actions/prodAction";
import { redirect } from "next/navigation";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import ThemeContext from "../../components/themeContext";

export default function SignUpPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit() {
        const data = {
            email,
            username,
            password,
            name
        }
        const res = await signUp(data);
        if (res.success) {
            alert(res.message)
            redirect("/");
        } else {
            setError(res.message);
        }
    }
    return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                padding: 20
            }}>
                {/* <div className=""> */}

                <Card className="md:w-100 w-full" style={{
                    display: "flex",
                    flexDirection: "column",
                    // borderWidth:"1px",
                    // borderColor:"solid-black",
                    // flexWrap:"wrap",
                    // justifyContent:"center",
                    // width:400,
                    // height:300,
                    gap: 15,
                    padding: 30
                    // alignItems:"center"
                }}>
                    <Text>CREATE NEW USER !</Text>
                    <TextField.Root type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                    <TextField.Root type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                    <TextField.Root type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                    <TextField.Root type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    <h2 className="text-red-600">{error}</h2>
                    <Button onClick={handleSubmit}>SignUp</Button>
                </Card>
                {/* </div> */}
            </div>
        
    )
}