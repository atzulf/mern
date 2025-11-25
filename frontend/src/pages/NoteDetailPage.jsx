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

    const handleDelete = () => {};

    if (loading) return <SpinnerLoad />;

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto p-4 mt-6">
                
                {/* Header action area */}
                <div className="flex items-center justify-between mb-6">
                    <Link to="/" className="btn btn-ghost">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Kembali Ke Home
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="btn btn-error btn-outline"
                    >
                        <Trash2Icon className="h-5 w-5" />
                        Hapus Note
                    </button>
                </div>

                
            </div>
        </div>
    );
};

export default NoteDetailPage;
