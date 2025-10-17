import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { verifyToken } from "../../services/jwt";
import prisma from "../../services/prismaClient";
import AddProd from "../../components/addProdBtn";

export default async function Page() {
    const cookie = await cookies();
    // if (!cookie.get('token')?.value) redirect("/signin")
    // console.log(cookie.get('token'))
    // const data = verifyToken(cookie.get('token')?.value)
    const token = cookie.get('token')?.value;
    if(!token) redirect("/signin");
    const data = verifyToken(token);
    const user = await prisma.user.findUnique({
        where: {
            id: data?.id
        },
        omit: {
            password: true
        }
    })
    return (
        <div className="grid place-content-center h-screen">
            {/* <div className="grid place-content-center">
                <div className="grid place-content-center md:text-5xl text-xl bg-indigo-600 p-2 mt-4 md:w-2xl  text-white rounded-2xl">Account & Details</div>
            </div> */}
            <div >
                <div className="max-w-sm mx-auto bg-slate-800 text-white p-5 rounded-2xl">
                    <div>
                        <div className="font-bold mx-auto grid place-content-center">
                            User Details
                        </div>
                    </div>
                    <div className="">
                        <div className="md:p-5 p-2">
                            <div>Name : {user?.name || "user's name is not saved yet!"}</div>
                            <div>Email : {user?.email}</div>
                            <div>Username : {user?.username || "username is not set yet!"}</div>
                        </div>
                    </div>
                    <div className="items-center  ml-25">
                        <AddProd/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}