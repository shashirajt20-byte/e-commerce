import prisma from "@/app/services/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try {
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");

        if(!userId){
            return NextResponse.json({
                success : false,
                message : "userId is required!"
            })
        }
        const res = await prisma.cart.findMany({
            where : {
                userId,
            
            },
            include : {
                product : true
            }
        });
        return NextResponse.json({
            success : true,
            data : res
        })
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : "Server error!"
        })
    }
}

export async function POST(req : NextRequest){
    try {
        const body = await req.json();
        const {userId, productId, quantity} = body;
        if(!userId || !productId){
            return NextResponse.json({
                success : false,
                message : "All fields are required!"
            })
        }
        // const existingItem = await prisma.cart.findFirst({
        //     where : {
        //         userId,
        //         productId
        //     }
        // })
        // let cartItem;
        // if(existingItem){
        //     cartItem = await prisma.cart.update({
        //         where : {
        //             id : existingItem.id
        //         },
        //         data : {
        //             quantity : existingItem.quantity + (quantity || 1)
        //         }
        //     })
        // }
        // else{
        const cartItem = await prisma.cart.create({
                data : {
                    userId,
                    productId,
                    quantity : quantity || 1
                }
            })
        // }
        return NextResponse.json({
            success : true,
            data : cartItem
        })
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : "Server error!"
        })
    }
}

// export async function DELETE(req : NextRequest){
//     try {
//         const { searchParams} = new URL(req.url);
//         const id = searchParams.get("id");
//         if(!id){
//             return NextResponse.json({
//                 success : false,
//                 message : "item is required!"
//             })
//         }
//         await prisma.cart.delete({
//             where : {
//                 id 
//             }
//         })
//         return NextResponse.json({
//             success : true,
//             message : "Item removed from cart!"
//         })
//     } catch (error) {
//         return NextResponse.json({
//             success  : false,
//             message : "server error!"
//         })
//     }
// }