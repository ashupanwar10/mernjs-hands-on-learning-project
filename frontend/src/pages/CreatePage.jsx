import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    VStack,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
    });

    const { addProduct } = useProductStore();
    const toast = useToast();

    async function handleAddProduct() {
        const { success, message } = await addProduct(newProduct);

        if (success) {
            toast({
                title: "Product added",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setNewProduct({
                name: "",
                description: "",
                price: 0,
                image: "",
            });
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Container maxW={"container.sm"}>
            {/* Your form elements go here */}

            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create a new product
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder={"Product Name"}
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder={"Product Description"}
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    description: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder={"Product Price"}
                            type={"number"}
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }
                        />
                        <Input
                            placeholder={"Product Image URL"}
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    image: e.target.value,
                                })
                            }
                        />

                        <Button
                            colorScheme="blue"
                            onClick={handleAddProduct}
                            w={"full"}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}
export default CreatePage;
