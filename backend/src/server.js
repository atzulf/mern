import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import ratelimiter from "./middleware/rateLimiter.js";
import path from "path";
// const express = require("express")

dotenv.config();

// buat ngecek process env
// console.log(process.env.MONGO_URI);

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// Apa itu endpoint?
// endpoint adalah kombinasi URL + HTTP method dari klien yang berinteraksi dengan spesifik 

// Midleware
if(process.env.NODE_ENV !== "production"){
    app.use
    (cors({
        origin: "http://localhost:5173",
        })
    );
};

app.use(express.json()); //midleware ini memparsing JSON body dari req.body

app.use(ratelimiter)



// contoh middleware sederhana
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

// app.use(express.static(path.join(__dirname, "../frontend/dist")))

// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// });

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });


}

connectDB().then (() => {
    app.listen(PORT, () => {
        console.log("server, started on PORT :", PORT);
    });
});


