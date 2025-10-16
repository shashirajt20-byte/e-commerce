//@ts-nocheck
'use client'
import FilterProd from "@/app/components/filterProd";
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"

export default function SearchPageLayout({ children }: { children: React.ReactNode }) {
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
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="block md:hidden">
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button>Filter Products</Button>
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth="230px">
                        <Dialog.Title>Filter Products</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            Filter products on your basis.
                        </Dialog.Description>

                        <Flex direction="column" gap="3">
                            <label>
                                {/* <Text as="div" size="2" mb="1" weight="bold">
                                    Name
                                </Text> */}
                                <TextField.Root
                                    type="number"
                                    value={min}
                                    onChange={handleMin}
                                    placeholder="Enter min price"
                                />
                            </label>
                            <label>
                                {/* <Text as="div" size="2" mb="1" weight="bold">
                                    Email
                                </Text> */}
                                <TextField.Root
                                    type="number"
                                    value={max}
                                    onChange={handleMax}
                                    placeholder="Enter max price"
                                />
                            </label>
                            <Select.Root defaultValue="1" value={rating} onValueChange={(val) => setRating(val)}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Label>1</Select.Label>
                                        <Select.Item value="1">1</Select.Item>
                                        <Select.Item value="2">2</Select.Item>
                                        <Select.Item value="3">3</Select.Item>
                                        <Select.Item value="4">4</Select.Item>
                                        <Select.Item value="5">5</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Flex>

                        <Flex gap="3" mt="4" justify="center">
                            <Dialog.Close>
                                <Button onClick={handleGo}>Apply</Button>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>

            </div>
            <div className="flex">
                <div className="hidden md:block md:w-49">
                    <FilterProd />
                </div>
                <div className="flex-1">
                {children}
                </div>
            </div>
        </div>
    )
}