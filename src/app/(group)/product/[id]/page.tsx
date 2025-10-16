//@ts-nocheck

import AddToCartBtn from "@/app/components/addToCartBtn";
import DeleteBtn from "@/app/components/deleteProdBtn";
import UpdateProd from "@/app/components/updataProdBtn";
import prisma from "@/app/services/prismaClient";
import Image from "next/image";

export async function generateMetadata({ params }) {
    const { id } = params;
    // const u = await fetch(`https://dummyjson.com/products/${id}`);
    // const y = await u.json();
    // return{
    //     title : "ecom : "+y.title
    // }
    // const id = await params.id;
    try {
        // const res = await fetch("http://localhost:3000/api/product/" + id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`, { cache: 'no-store' });
        const data = await res.json();
        const productId = data?.data;
        return {
            title: productId?.title || "Product not found",
            description: productId?.description
        }
    } catch (error) {
        return {
            title: "Product not found",
            description: "Product could not be loaded"
        }
    }
    // try {
    //     const productId = await prisma.product.findUnique({
    //         where: {
    //             id: params.id
    //         }
    //     });
    //     return {
    //         title: productId?.title || "Product not found",
    //         description: productId?.description
    //     }
    // } catch (error) {
    //     return {
    //         title: "Product not found",
    //         description: "Product could not be loaded"
    //     }
    // }
}

// export default async function productPage({ params }) {

//     // const {id} = params;
//     // const url = await fetch(`https://dummyjson.com/products/${id}`);
//     // const x = await url.json();
//     const id = await params.id;
//     const res = await fetch("http://localhost:3000/products/" + id);
//     const data = await res.json();
//     const product = data?.data;
//     return (
//         <div>
//             <Image width={400} height={400} alt = {product?.title} src={product?.image}/>
//             <div>
//                 <h1>{product?.title}</h1>
//                     <p>{product?.description}</p>
//                     <p>{product?.rating}</p>
//                     <p>Price: ${product?.price}</p>
//             </div>
//             <AddToCartBtn />

//         </div>
//     )
// }

export default async function Prodpage({ params }) {
    const { id } = params;
    // const productId = await prisma.product.findUnique({
    //     where : {
    //         id : params.id
    //     }
    // });
    let productId;
    try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`)
        const data = await response.json();
        productId = data?.data;
    } catch (error) {
        console.log("The error is ", error)
    }


    return (
        <div className="md:ml-3 p-2">
            <img width={400} height={400} src={productId?.image||"/placeholder.png"} alt={productId?.title|| "/Product image"} />
            <h1>{productId?.title||"No title available"}</h1>
            <p>M.R.P : Rs{productId?.price||"Not available"}</p>
            <p>{productId?.description||""}</p>

            <AddToCartBtn item={productId} />
            {
                productId && (
                    <div className="mt-2 flex gap-2">
                        <UpdateProd product={productId} />
                        <DeleteBtn Prod={productId} />
                    </div>
                )
            }
        </div>
    )
}