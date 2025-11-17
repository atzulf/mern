import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    // res.status(200).send("kmu baru saja berhasil feching api apipii fireeee omawwa");
    try {
        const notes = await Note.find().sort({ createAt: -1}); //digunakan untuk mengurutkan dari awal
        res.status(200).json(notes)
    }
    catch {
        console.error("Error in getAllNotesController", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function getNotesById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message: "Note tidak ditemukan"})
        res.json(note);
    } catch (error) {
        console.error("Error in getNotesById", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function createNotes(req, res) {
    // res.status(201).json({message:"kmu baru saja berhasil membuat post!"})
    try{
        const {title, content} = req.body;
        const note = new Note({title:title, content:content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }
    catch(error){
        console.error("Error in createNote Controller", error);
        res.status(500).json({message: "Internal server Error"});

    }
}

export async function updateNotes(req, res) {
    try {
        const {title,content} = req.body
        const updatedNotes = await Note.findByIdAndUpdate
        (req.params.id, {title,content}, {
            new:true,
        });

        if(!updatedNotes) return res.status(404).json({message:"Note tidak ditemukan"})
        
        res.status(200).json(updatedNotes);
    } catch (error) {
        console.error("Error in updateNote Controller", error);
        res.status(500).json({message: "Internal server Error"});
    }
}

export async function deleteNotes(req, res) {
    try {
        const deletedNotes = await Note.findOneAndDelete
        (req.params.id)
        if(!deletedNotes) return res.status(404).json({message: "Note tidak ditemukan"});
        res.status(200).json({message: "Note berhasil dihapus!"})
    } catch (error) {
        console.error("Error in deleteNote Controller", error);
        res.status(500).json({message: "Internal server Error"});
    }
}