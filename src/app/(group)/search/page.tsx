//@ts-nocheck
import ItemCard from "@/app/components/itemCard";

export async function generateMetadata({searchParams}){
    const params = await searchParams;
    const query = await params.q;
    return{
        title : (query || '')
    }
}

export default async function SearchPage({searchParams}){
    const params = await searchParams;
    const query = await params.q;

    const url = await fetch("http://localhost:3000/api/search?q="+ encodeURIComponent(query));
    const data = await url.json();
    let result = data?.data || [];

    const min = searchParams.min;
    const max = searchParams.max;
    const rating = searchParams.rating;

    if(min){
        result = result.filter(function(item){
            if(item.price >= min){
                return true;
            }
        })
    }
    if(max){
        result = result.filter(function(item){
            if(item.price <= max){
                return true;
            }
        })
    }
    if(rating){
        result = result.filter(function(item){
            if(item.rating > rating){
                return true;
            }
        })
    }
    return(
        <div style={{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:"center",
            gap:10,
            padding:10
        }}>
            {
                result.map(function(item){
                    return <ItemCard key={item.id} item={item}/>
                })
            }
        </div>
    )
}