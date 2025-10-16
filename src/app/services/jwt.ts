import * as jwt from "jsonwebtoken";

export function generateToken(data){
    //@ts-ignore
    const token = jwt.sign(data, process.env.JWT_SECRET as string)
    return token;
}

export function verifyToken(token){
    //@ts-ignore
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return data;
}