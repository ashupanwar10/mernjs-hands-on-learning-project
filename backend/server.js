import express from "express";
import dotenv from "dotenv";
// import { bodyParser } from "body-parser";
import { connectDatabase } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// importing the routes
app.use("/api/products", productRoutes);

// connect to DB before statring the server
app.listen(PORT || 5000, async function () {
    await connectDatabase();
    console.log("Server is running on port 5000");
});
