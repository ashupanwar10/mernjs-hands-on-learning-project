import express from "express";
import dotenv from "dotenv";
// import { bodyParser } from "body-parser";
import { connectDatabase } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

// importing the routes
app.use("/api/products", productRoutes);

// connect to DB before statring the server
app.listen(5000, async function () {
    await connectDatabase();
    console.log("Server is running on port 5000");
});
