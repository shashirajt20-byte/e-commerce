'use client'

import { Button } from "@radix-ui/themes";
import { deleteProduct } from "../actions/prodAction";
import { useRouter } from "next/navigation";

export default function DeleteBtn({Prod}:{Prod:any}) {
    const router = useRouter();
    async function handleSubmit(){
        const res = await deleteProduct(Prod.id);
        if(res.success){
            alert("Product deleted successfully!")
            router.push("/");
        }
    }
    return (
        <div>
            <Button onClick={handleSubmit}>
                Delete
            </Button>

        </div>
    )
}