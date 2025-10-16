//@ts-nocheck

import ItemCard from "../components/itemCard";



export default async function Home(){
  // const response = await fetch("https://dummyjson.com/products?limit=194");
  // const data = await response.json();
  // const products = data?.products || [];

  // const products = await prisma.product.findMany();
  
  const response = await fetch("http://localhost:3000/api/product",{cache:"no-store"});
  const data = await response.json();
  const products = data?.data || [];
  return (
    <div style={{
      display:"flex",
      flexWrap:"wrap",
      padding : "10px",
      gap:"15px",
      justifyContent:"center",
      
    }}>
      {
        products.map(function(item){
          return <ItemCard key={item.id} item={item}/>
        })
      }
    </div>
  )
}