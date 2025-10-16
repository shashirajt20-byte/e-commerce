import prisma from "@/app/services/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {email, username, name, avatar}=body;

        if(!username||!email){
            return NextResponse.json({
                success : false,
                message : "Username and email are required"
            })
        }

        const existingUser = await prisma.user.findUnique({
            where : {username}
        });
        if(existingUser) {
            const updatedUser = await prisma.user.update({
                where : {username},
                data : {name, avatar}
            });
            return NextResponse.json({
                success : true,
                data : updatedUser
            })
        }else{
            const newUser = await prisma.user.create({
                data : {
                    username,
                    email,
                    name,
                    avatar
                }
            });
            return NextResponse.json({
                success :true,
                data : newUser
            })
        }
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : "Internal server error"
        })
    }
}