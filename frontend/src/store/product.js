import { create } from "zustand";

const DOMAIN_NAME = "http://localhost:5000";

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
        set((state) => ({ products: [...state.products, data.products] }));

        return {
            success: true,
            message: "Product added successfully",
        };
    },
    getProducts: async () => {
        const response = await fetch(`${DOMAIN_NAME}/api/products`);
        if (!response.ok) {
            return {
                success: false,
                message: "Failed to fetch products",
            };
        }
        const data = await response.json();
        set({ products: data.products });
        return {
            success: true,
            message: "Products fetched successfully",
        };
    },
    deleteProduct: async (pid) => {
        const response = await fetch(`${DOMAIN_NAME}/api/products/${pid}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            return {
                success: false,
                message: "Failed to delete product",
            };
        }
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
        return {
            success: true,
            message: "Product deleted successfully",
        };
    },
    updateProduct: async (pid, updatedProduct) => {
        const response = await fetch(`${DOMAIN_NAME}/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) {
            return {
                success: false,
                message: "Failed to update product",
            };
        }
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid
                    ? { ...product, ...updatedProduct }
                    : product
            ),
        }));
        return {
            success: true,
            message: "Product updated successfully",
        };
    },
}));
