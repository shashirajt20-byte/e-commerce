//@ts-nocheck
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import UpdateProd from "./updataProdBtn";
import DeleteBtn from "./deleteProdBtn";

export default function ItemCard({ item }) {
    if (!item) return null;
    const href = `/product/${item.id}`;
    return (
        // <div>
        //     <Link href={href}>
        //         <Box width="240px">
        //             <Card size="2">
        //                 <Inset clip="padding-box" side="top" pb="current">
        //                     <img 
        //                         src={item.image}
        //                         alt={item.title}
        //                         style={{
        //                             display: "black",
        //                             objectFit: "cover",
        //                             width: "100%",
        //                             height: "100%",
        //                             backgroundColor: "var(--gray-5)",
        //                         }}
        //                     />
        //                 </Inset>
        //                 <Text as="h" size="3">
        //                     <Strong>{item.title}</Strong>

        //                 </Text>
        //                 <Text as="p" size="2">Price : {item.price}</Text>
        //                 {/* <Text as="p" size="2">Rating : {item.rating}</Text> */}
        //                 <Text as="p" size="2">{item.description}</Text>
        //             </Card>
        //         </Box>
        //     </Link>
        //     <UpdateProd product={item} />
        //     <DeleteBtn Prod={item} />
        // </div>
        <div>
            <Link href={href}>
                <div className="h-52 w-38 md:h-77 md:w-60  overflow-hidden rounded">
                    <div className="h-35 md:h-60 bg-slate-100 overflow-hidden items-center">
                        <img src={item.image || "/placeholder.png"} alt={item.title||"Product image"} />
                    </div>
                    <div>
                        <h1 className="font-semibold">{item.title||"Not title available"}</h1>
                        <p className="text-sm">M.R.P : Rs.{item.price||"Not available"}</p>
                        <p>{item.description||""}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}