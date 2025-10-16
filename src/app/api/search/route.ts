import prisma from "@/app/services/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { searchParams }: {
    searchParams: {
        id: string
    }
}) {
    const sp = req.nextUrl.searchParams;
    const query = sp.get("q");
    const min = sp.get("min");
    const max = sp.get("max");
    const rating = sp.get("rating");

    if (!query) {
        return NextResponse.json({
            success: false,
            message: "No query found!"
        })
    }
    const data = await prisma.product.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive"
            },
            price: {
                ...(min ? { gte: Number(min) } : {}),
                ...(max ? { lte: Number(max) } : {}),
            }
        }
    })

    return NextResponse.json({
        success: true,
        data: data
    })
}