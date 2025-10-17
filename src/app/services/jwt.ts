import * as jwt from "jsonwebtoken";

export function generateToken(data:{id:string}){
    //@ts-ignore
    const token = jwt.sign(data, process.env.JWT_SECRET as string)
    return token;
}

export function verifyToken(token :string):{id:string}| null{
    //@ts-ignore
    // const data = jwt.verify(token, process.env.JWT_SECRET)
    // return data;
    try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    return data;
  } catch (error) {
    return null; // agar invalid ya expired token hai
  }
}