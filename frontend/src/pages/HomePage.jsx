import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

function HomePage() {
    const { getProducts, products } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    console.log(products);

    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    bgClip={"text"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                >
                    Welcome to the Product Management App
                </Text>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={10}
                    width={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
                <Text
                    fontSize="xl"
                    textAlign={"center"}
                    fontWeight={"bold"}
                    color={"gray.500"}
                >
                    No products found 😢{" "}
                    <Link to={"/create"}>
                        <Text
                            as={"span"}
                            color={"blue.500"}
                            _hover={{ textDecoration: "underline" }}
                        >
                            Create a product
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
}

export default HomePage;
