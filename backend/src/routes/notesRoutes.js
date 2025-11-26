import express from "express";
import { createNotes, getNotesById, deleteNotes, getAllNotes, updateNotes } from "../controllers/notesController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API untuk mengelola catatan (CRUD Notes)
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Ambil semua notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua notes
 */
router.get("/", getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Ambil notes berdasarkan ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil mengambil notes
 *       404:
 *         description: Notes tidak ditemukan
 */
router.get("/:id", getNotesById);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Buat notes baru
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notes berhasil dibuat
 */
router.post("/", createNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update notes berdasarkan ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notes berhasil diperbarui
 */
router.put("/:id", updateNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Hapus notes berdasarkan ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notes berhasil dihapus
 */
router.delete("/:id", deleteNotes);

export default router;

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
