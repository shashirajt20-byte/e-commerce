//@ts-nocheck
'use client'

import {Button, Dialog, Flex, Select,Text,TextField } from "@radix-ui/themes";
import { useState } from "react";
import { createJob, createProduct } from "../actions/prodAction";
import { useRouter } from "next/navigation";

export default function AddProd() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState("accessories");

    const router = useRouter();

    async function handleSubmit(){
        const formdata = {
            title,
            description : desc,
            image : url,
            price,
            category
        }
        const res = await createProduct(formdata);
        if(res.success){
            alert("Product saved successfully!")
            // router.refresh();
            window.location.reload();

        }else{
            alert("Product not saved!");
        }
    }
    
    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Add Product</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Add Product</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Enter the details of the products.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Title
                            </Text>
                            <TextField.Root
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                placeholder="Enter title"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Description
                            </Text>
                            <TextField.Root
                                value={desc}
                                onChange={(e)=>setDesc(e.target.value)}
                                placeholder="Enter description"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Image url
                            </Text>
                            <TextField.Root
                                value={url}
                                onChange={(e)=>setUrl(e.target.value)}
                                placeholder="https://..."
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Price
                            </Text>
                            <TextField.Root
                                value={price}
                                onChange={(e)=>setPrice(parseFloat(e.target.value)||0)}
                                placeholder="Set the price"
                            />
                        </label>
                        <Select.Root defaultValue="accessories" value={category} onValueChange={(val)=>setCategory(val)}>
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>category</Select.Label>
                                    <Select.Item value="shoes">Shoes</Select.Item>
                                    <Select.Item value="electronics">Electronics</Select.Item>
                                    <Select.Item value="mobiles">Mobiles</Select.Item>
                                    <Select.Item value="laptops">Laptops</Select.Item>
                                    <Select.Item value="accessories">Accessories</Select.Item>
                                    <Select.Item value="beauty">Beauty & Personal Care</Select.Item>
                                    <Select.Item value="groceries">Groceries</Select.Item>
                                    <Select.Item value="food">Food & Beverages</Select.Item>
                                    <Select.Item value="furniture">Furniture</Select.Item>
                                    <Select.Item value="home">Home & Kitchen</Select.Item>
                                    <Select.Item value="toys">Toys & Games</Select.Item>
                                    <Select.Item value="sports">Sports & Fitness</Select.Item>
                                    <Select.Item value="books">Books & Stationery</Select.Item>
                                    <Select.Item value="jewelry">Jewelry</Select.Item>
                                    <Select.Item value="bags">Bags & Luggage</Select.Item>
                                    <Select.Item value="health">Health & Wellness</Select.Item>
                                    <Select.Item value="baby">Baby Products</Select.Item>
                                    <Select.Item value="automotive">Automotive</Select.Item>
                                    <Select.Item value="pet">Pet Supplies</Select.Item>
                                    <Select.Item value="clothes & wear">Clothing & Wearing</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>

                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={handleSubmit}>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

        </div>
    )
}