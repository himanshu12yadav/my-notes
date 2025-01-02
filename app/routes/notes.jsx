import {isRouteErrorResponse, Link, useLoaderData, useRouteError} from '@remix-run/react'
import {getStoredNotes, storedNotes} from "../data/notes.js";
import NoteList, {links as noteList} from "../components/NoteList.jsx";
import NewNote, {links as newNote} from "../components/NewNote.jsx";
import {redirect} from "@remix-run/node";


export const loader = async ()=>{
    const notes = await getStoredNotes();
    return notes;
}

export const action = async ({request})=>{
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    if (noteData.title.trim().length < 5){
        return {message: 'Invalid title - must be at least 5 characters long'}
    }

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toLocaleDateString('en-IN',{
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const updatedNotes = [...existingNotes, noteData];
    await storedNotes(updatedNotes);
    return redirect('/notes');
}

export default function Notes(){
    const notes = useLoaderData();

    return (
        <main>
            <NewNote/>
            <NoteList notes={notes}/>
        </main>
    )
}

export const ErrorBoundary = ()=>{
    const caughtError = useRouteError();

    if (isRouteErrorResponse(caughtError)){
        return (
            <div>
                <h1>{caughtError.status}</h1>
                <p>{caughtError.data}</p>
            </div>
        )
    }

    return (
        <main className="error">
            <h1>An error occurred related to notes.</h1>
            <p>{caughtError.statusText}</p>
            <p>
                Back to <Link to="/">Back to safety</Link>
            </p>
        </main>
    )
}

export const links = ()=>{
    return [...noteList(), ...newNote()]
}

export const meta = ()=>{
    return [
        {
            title:'All Notes',
            description:'All Notes Page'

        }
    ]
}
