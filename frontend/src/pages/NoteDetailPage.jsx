import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';


const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [save, setSave] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async() => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch(error) {
                console.log("Error Fetching Note", error);
                toast.error("Gagal Fetch API");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    },
    [id]
    );

    console.log({ note });

    return (
        <div>
            Note Detail Page
        </div>
    )
}

export default NoteDetailPage