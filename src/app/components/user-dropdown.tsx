//@ts-nocheck
import { Button, DropdownMenu } from "@radix-ui/themes";
import { CircleUserRound } from "lucide-react";
import { signIn, signOut } from "../actions/prodAction";
import AddProd from "./addProdBtn";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";
import AddToCartBtn from "./addToCartBtn";
import { context } from "./themeContext";

export default function UserDropDown() {
    const {user, setUser} = useContext(AuthContext);
    const {isDark, setIsDark} = useContext(context);
    const router = useRouter();
    function themeChanger(){
        if(isDark){
            setIsDark(false);
        }else{
            setIsDark(true);
        }
    }
    function returnOrder(){
        router.push("/returnOrderHistory")
    }
    function handleProfile(){
        router.push("/profile")
    }
    function handleSignUp(){
        router.push("/signup");
    }
    function handleSignIn(){
        router.push("/signin");
    }
    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <CircleUserRound />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={handleProfile}>Your Profile</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={handleSignUp}>Create new user </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={returnOrder}>Return & Order</DropdownMenu.Item>

                    {/* <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item><AddProd /></DropdownMenu.Item>
                            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                            <DropdownMenu.Separator />
                            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub> */}

                    <DropdownMenu.Separator />
                    {/* <DropdownMenu.Item> */}
                        {
                            isDark? <DropdownMenu.Item color="white" onClick={themeChanger}>Light</DropdownMenu.Item> :<DropdownMenu.Item  color="black" onClick={themeChanger}>Dark</DropdownMenu.Item>
                        }
                    {/* </DropdownMenu.Item> */}
                    {/* <DropdownMenu.Item>Add to favorites</DropdownMenu.Item> */}
                    <DropdownMenu.Separator />
                    {
                        user ? <DropdownMenu.Item  color="red" onClick={() => signOut()}>
                            LogOut
                        </DropdownMenu.Item> : <DropdownMenu.Item  color="red" onClick={handleSignIn}>
                            LogIN
                        </DropdownMenu.Item>
                    }
                </DropdownMenu.Content>
            </DropdownMenu.Root>

        </div>
    )
}