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
app.use(express.json()); //midleware ini memparsing JSON body dari req.body


app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

connectDB();

app.listen(PORT, () => {
    console.log("server, started on PORT :", PORT);
});
