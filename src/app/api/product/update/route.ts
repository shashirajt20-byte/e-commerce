import prisma from "@/app/services/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const body = await req.json();
    const updateProd = {
        title : body.title,
        description : body.description,
        price : body.price,
        image : body.image,
        rating : 1
    }
    const data = await prisma.product.update({
        where : {
            id : body.id
        },
        data : updateProd
    })
    return NextResponse.json({
        success : true,
        data : data
    })
}