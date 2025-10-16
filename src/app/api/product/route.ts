import prisma from "@/app/services/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const res = await prisma.product.findMany();
    return NextResponse.json({
        success : true,
        data : res
    })
}

export async function POST(req: NextRequest){
    const body = await req.json();

    const productToSave = {
        title : body.title,
        description : body.description,
        price : body.price,
        image : body.image,
        rating : 1
    }
    const product = await prisma.product.create({
        data : productToSave
    })
    return NextResponse.json({
        success : true,
        data : product
    })
}