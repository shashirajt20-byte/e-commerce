//@ts-nocheck
'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterProd(){
    const searchParams = useSearchParams();
        const searchTerm = searchParams.get("q") || "";
        const minPrice = searchParams.get("min") || "";
        const maxPrice = searchParams.get("max") || "";
        const minRating = searchParams.get("rating") || "";
    
        const [min, setMin] = useState(minPrice);
        const [max, setMax] = useState(maxPrice);
        const [rating, setRating] = useState(minRating);
    
        function handleMin(e) {
            setMin(e.target.value);
        }
        function handleMax(e) {
            setMax(e.target.value);
        }
        function handleRating(e) {
            setRating(e.targe.value);
        }
    
        const router = useRouter();
    
        function handleGo() {
            let url = "/search?";
            if (searchTerm) {
                url += "q=" + searchTerm;
            }
            if (min) {
                url += "&min=" + min;
            }
            if (max) {
                url += "&max=" + max;
            }
            if (rating) {
                url += "&rating=" + rating;
            }
            router.push(url);
        }
    return(
        <div className="flex flex-col gap-1.5 p-1">
                    <h1 className="font-bold">Filter Products</h1>
                    <input type="number" value={min} onChange={handleMin} placeholder="minimum price ..." />
                    <input type="number" value={max} onChange={handleMax} placeholder="maximum price ..." />
                    <div className="flex border border-black justify-between ">
                        <p className="ml-1">Rating : </p>
                        <select name="rating" id="rating" onChange={handleRating} value={rating}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button className="bg-amber-300  p-1" onClick={handleGo}>Apply</button>
                </div>
    )
}