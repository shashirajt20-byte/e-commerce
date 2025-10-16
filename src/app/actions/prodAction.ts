'use server'
import { cookies } from "next/headers";
import { generateToken, verifyToken } from "../services/jwt";
import prisma from "../services/prismaClient";
import { redirect } from "next/navigation";

export async function createProduct(productData: any) {
    try {
        const product = await prisma.product.create({
            data: productData
        })
        return {
            success: true,
            data: product
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong!"
        }

    }
}

export async function updateProduct(productdata: any, id: string) {
    try {
        const product = await prisma.product.update({
            where: {
                id: id
            },
            data: productdata
        });
        return {
            success: true,
            data: product
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function signUp(
    data: {
        email: string,
        username: string,
        name: string,
        password: string
    }
) {
    try {
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (existingEmail) {
            return {
                success: false,
                message: "This email already exist!"
            }
        }
        const existingUsername = await prisma.user.findUnique({
            where: {
                username: data.username
            }
        })
        if (existingUsername) {
            return {
                success: false,
                message: "This username already exist!"
            }
        }
        const newUser = await prisma.user.create({
            data: data
        })

        const token = generateToken({
            id: newUser.id
        })
        const cookie = await cookies()
        cookie.set('token', token)


        return {
            success: true,
            message: "User created successfully!"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function signIn(
    data: {
        email: string,
        password: string
    }
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (!user) {
            return {
                success: false,
                message: "Invalid email!"
            }
        }
        if (user.password != data.password) {
            return {
                success: false,
                message: "Invalid password!"
            }
        }
        const token = generateToken({
            id: user.id
        })
        const cookie = await cookies()
        cookie.set('token', token)
        return {
            success: true,
            message: "User logged in successfully!"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function signOut() {
    const cookie = await cookies();
    cookie.set('token', "", { maxAge: 0 });
    redirect('/signin')
}

// export async function addProdToCart(item: any) {
//     try {
//         const userId = "66f9c8d22b6c1d1234567890";
        
//         const cartitems = await prisma.cart.findMany({
//             where: {
//                 userId,
//                 id : item.id
//             }
//         })
//         if (cartitems) {
//             return {
//                 success: false,
//                 message: "Item is already in Cart!"
//             }
//         } else {
//             const product = await prisma.cart.create({
//                 data: item
//             })
//             return {
//                 success: true,
//                 data : product,
//                 message: "Item added to the Cart!"
//             }
//         }

//     } catch (error) {
//         console.log("The error is : \n");
//         console.log(error);
//         return {
//             success: false,
//             message: "Something went wrong!"
//         }
//     }
// }

export async function addProdToCart(item : any){
    try {
        const cookie = await cookies()
        const token = cookie.get("token")?.value;
        if(!token){
            redirect("/signin");
        }
        const data = verifyToken(token);
        const userId = data.id;
        const existingItem = await prisma.cart.findFirst({
            where : {
                userId,
                productId : item.id
            }
        })
        if(existingItem){
            return {
                success : false,
                message : "Item is already in cart!"
            }
        }
        const newCart = await prisma.cart.create({
            data : {
                userId,
                productId : item.id,
                quantity : 1
            }
        })
        return{
            success : true,
            message : "Item added to cart!",
            data : newCart
        }
    } catch (error) {
        return{
            success : false,
            message : "Something went wrong!"
        }
    }
}

export async function deleteFromCart(id: string) {
    try {
        await prisma.cart.delete({
            where: {
                id: id
            }
        })
        return {
            success: true,
            message  : "Item is deleted from the cart!"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

export async function updateQuantity(id: string, quantity: number) {
    try {
        await prisma.cart.update({
            where: {
                id: id
            },
            data: {
                quantity : Number(quantity) || 0
            }
        })
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}