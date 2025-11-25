import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import SpinnerLoad from '../components/SpinnerLoad';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import Navbar from '../components/Navbar';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async() => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log("Error dalam Fetching API di Note", error);
                toast.error("Gagal Fetch API di Note");
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);
    
    const handleDelete = async() => {
        if(!window.confirm("Apakah kamu yakin ingin menghapus catatan ini?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note berhasil dihapus😎");
            navigate("/")
        } catch (error) {
            console.log("Gagal saat menghapus note", error);
            toast.error("Gagal menghapus Note😭")
        }
    };

    const handeSave = () => {};
    
    if (loading) return <SpinnerLoad />;

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto p-4 mt-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header action area */}
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost inline-flex items-center gap-2">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Kembali Ke Home
                        </Link>

                        <button onClick={handleDelete} className="btn btn-error btn-soft inline-flex items-center gap-2">
                            <Trash2Icon className="h-5 w-5" />
                            Hapus Note
                        </button>
                    </div>

                    <div className="card bg-cyan-950/90 backdrop-blur-sm hover:shadow-lg transition-all duration-200 border-t-4 border-cyan-500">
                        <div className="card-body">

                            {/* Title Field */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-1">Judul</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan judul catatan"
                                    className="w-full bg-base-100/40 border border-base-content/20 rounded-xl px-4 py-2 h-12 focus:ring-2 focus:ring-primary"
                                    value={note?.title ?? ''}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>

                            {/* Content Field */}
                            <div>
                                <label className="block text-sm font-semibold mb-1">Isi Note</label>
                                <textarea
                                    placeholder="Tulis catatanmu di sini..."
                                    className="w-full bg-base-100/40 border border-base-content/20 rounded-xl px-4 py-2 h-48 resize-none focus:ring-2 focus:ring-primary"
                                    value={note?.content ?? ''}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handeSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;
