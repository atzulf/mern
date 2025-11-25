import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const messages429 = [
        "Sante bro! slow, mencetmu kecepeten 🤬",
        "Napaaaa kliknya kayak pake turbo? 🏎️💨",
        "Bro tarik napas dulu 😤",
        "Santai... server bukan kereta cepat 😭",
        "Tenang masbro, jangan marah-marah 😅",
        "Gass pol juga servernya ngos-ngosan lho 🥵",
    ];

        const random429Message = () => {
    return messages429[Math.floor(Math.random() * messages429.length)];
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("Semua kolom harus terisi");
            return;
        }

        setLoading(true);

        try {
            await api.post("/notes", { title, content });

            toast.success("Note berhasil dibuat");
            navigate("/");
        } catch (error) {
            console.log("Error membuat Note", error);

            if (error.response?.status === 429) {
                toast.error(random429Message(), {
                    duration: 4000,
                });
            } else {
                toast.error("Gagal membuat Note");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto p-4">

                {/* Back Button */}
                <Link to="/" className="btn btn-ghost mb-6">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Kembali Ke Home
                </Link>

                {/* Form Card */}
                <div className="card bg-cyan-950/90 blend-color-dodge hover:shadow-lg transition-all duration-200 
                    border-t-4 border-solid border-cyan-500 p-6">
                    <h2 className="card-title text-2xl mb-5">
                        Buat Note Baru
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Title Field */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Judul
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan judul catatan"
                                className="w-full bg-base-100/40 border border-base-content/20 rounded-xl px-4 py-2 h-12 focus:ring-2 focus:ring-primary"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Content Field */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Isi Note
                            </label>
                            <textarea
                                placeholder="Tulis catatanmu di sini..."
                                className="w-full bg-base-100/40 border border-base-content/20 rounded-xl px-4 py-2 h-40 resize-none focus:ring-2 focus:ring-primary"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn btn-primary rounded-xl px-6"
                                disabled={loading}
                            >
                                {loading ? "Membuat..." : "Buat"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
