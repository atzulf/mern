import express from "express";
import { createNotes, getNotesById, deleteNotes, getAllNotes, updateNotes } from "../controllers/notesController.js";

const router = express.Router();    

router.get("/",getAllNotes);
router.get("/:id",getNotesById);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router

// app.get("/api/notes", (req, res) => {
//     // kirim notes
//     res.status(200).send("you got 5 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message:"post created successfully!"})
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({message:"post updated successfully!"})
// });

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message:"post deleted successfully!"})
// });