import { create } from "zustand";
import dotenv from "dotenv";

dotenv.config();
const DOMAIN_NAME = process.env.DOMAIN_NAME || "http://localhost:5000";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    addProduct: async (product) => {
        if (
            !product.name ||
            !product.description ||
            !product.price ||
            !product.image
        ) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        const response = await fetch(`${DOMAIN_NAME}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            return {
                success: false,
                message: "Failed to add product",
            };
        }

        const data = await response.json();
        set((state) => ({ products: [...state.products, data] }));
        return {
            success: true,
            message: "Product added successfully",
        };
    },
}));
