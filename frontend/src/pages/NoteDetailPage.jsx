import React from 'react'
import toast from 'react-hot-toast'

const NoteDetailPage = () => {
    return (
        <>
        <div>NoteDetailPage</div>
        <button onClick={() => toast.success('MAntap mhang')} className="bg-amber-500 btn w-64 rounded-full">Button</button>
        </>
        
    )
}

export default NoteDetailPage