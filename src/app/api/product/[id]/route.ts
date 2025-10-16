import prisma from "@/app/services/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req : NextRequest, context: {params: Promise<{id : string}>}){
    const {id}= await context.params;
    if(!id){
        return NextResponse.json({
            success : false,
            message : "no id provided"
        })
    }
    const product = await prisma.product.findUnique({
        where : {
            id
        }
    })
    return NextResponse.json({
        success : true,
        data : product
    })
}