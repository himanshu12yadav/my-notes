import styles from './NoteList.css?url';
import {Link} from '@remix-run/react';
import {useEffect, useState} from 'react';

export const links = ()=>{
    return [
        {
            rel:'stylesheet',
            href: styles
        }
    ]
}

function FormattedTime({dateString}){
    const [formattedDate, setFormattedDate] = useState(dateString);

    useEffect(()=>{
        const formatted = new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        setFormattedDate(formatted);
    },[dateString]);

    return (
        <time dateTime={dateString}>
            {formattedDate}
        </time>
    )
}

export default function NoteList({notes}){
    return (
        <ul id="note-list">
            {
                notes.map((note, index)=>(
                    <li key={index} className="note">
                        <Link to={note.id}>
                            <article>
                                <header>
                                    <ul className="note-meta">
                                        <li>
                                            #{index + 1}
                                        </li>
                                        <li>
                                            <FormattedTime dateString={note.id}/>
                                        </li>
                                    </ul>
                                    <h2>{note.title}</h2>
                                </header>
                                <p>{note.content}</p>
                            </article>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}
