import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
// const express = require("express")

dotenv.config();

// buat ngecek process env
// console.log(process.env.MONGO_URI);

const app = express()
const PORT = process.env.PORT || 5001

// Apa itu endpoint?
// endpoint adalah kombinasi URL + HTTP method dari klien yang berinteraksi dengan spesifik 

// Midleware
app.use(express.json());

app.use("/api/notes", notesRoutes);

connectDB();

app.listen(PORT, () => {
    console.log("server, started on PORT :", PORT);
});

// mongodb+srv://mazegent123_db_user:6727o5K3uv8KNJbt@cluster0.cnlm0oo.mongodb.net/?appName=Cluster0