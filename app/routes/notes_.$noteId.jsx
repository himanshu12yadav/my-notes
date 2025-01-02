import {Link, useLoaderData, useRouteError} from "@remix-run/react";
import styles from '../styles/note-details.css?url';
import {getStoredNotes} from "../data/notes.js";

export const loader = async ({params})=>{
    const notes = await getStoredNotes();
    const note = notes.find((note)=>note.id===params.noteId);
    if (note){
        return note;
    }

    throw new Response(JSON.stringify({message:"Note not found"}),{status:404});
}

export default function NoteDetailsPage(){
    const loaderData = useLoaderData();
    const {title, content} = loaderData;
    console.log(loaderData);
    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{title}</h1>
            </header>
            <p id="note-details-content">
                {content}
            </p>
        </main>
    )
}

export const ErrorBoundary = ()=>{
    const caughtError = useRouteError();

    return (
        <main className="error">
            <h1>{JSON.parse(caughtError.data).message}</h1>
            <p>
                <Link to="/notes">Create a new note</Link>
            </p>
        </main>
    )
}

export const links = ()=>{
    return [{
        rel:"stylesheet",
        href:styles
    }]
}


export const meta = ({data})=>{
    return [{
        title:data.title,
        description:"Note Details Page"
    }]
}
