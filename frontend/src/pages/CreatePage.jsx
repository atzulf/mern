import { ArrowLeftIcon} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!title.trim() || !content.trim()) {
            toast.error("Semua kolom harus terpenuhi");
            return;
        }

        setLoading(true)
        try {
            await api.post("/notes", {
                title,
                content
            });

            toast.success("Note berhasil dibuat");
            navigate("/")
        } catch (error) {
            console.log("Error membuat Note",error);
            if(error.response.status === 429) {
                toast.error("Sante bro! slow, mencetmu kecepeten", {
                duration: 4000,
                icon:"🤬",
            });
            } else {
                toast.error("Gagal membuat Note");
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className='container mx-auto px-4 py-5'>
                <div className='max-w-2xl mx-auto'>
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Kembali ke note
                    </Link>

                    <div className="card bg-base-100">
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl mb-4">Buat Note Baru</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-5">Judul</label>
                                        <input 
                                            type="text" 
                                            placeholder="Tulis Judul Catatan"
                                            className="w-full bg-base-100 border border-base-content/20 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                </div>

                                <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Isi Note</label>
                                <textarea
                                    placeholder="Tulis Diarymu disini"
                                    className="w-full bg-base-100 border border-base-content/20 rounded-xl px-4 py-2 h-32 focus:ring-2 focus:ring-primary"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                </div>


                            <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary rounded-4xl" disabled={loading}>
                                {loading ? "Creating..." : "Klik untuk buat"}
                            </button>
                            </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage