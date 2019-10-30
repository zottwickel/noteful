import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './NotesList.css'

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function NotesList(props) {
    const id = useParams()
    let notes = props.notes
    if (id.folderid) {
        notes = props.notes.filter(note => {
            if (note.folderId === id.folderid) {
                return note
            }
        })
    }
    return (
        <div>
            <div className="listWrapper">
                <ul className="noteList">
                    {notes.map(note => {
                        const modifiedDate = new Date(note.modified)
                        const notePath = `/note/${note.id}`
                        return (
                            <div>
                                <li className="noteListItem" key={note.id}>
                                    <div className="noteItemLeft">
                                        <h3>
                                            <Link className="noteTitle" to={notePath}>
                                                {note.name}
                                            </Link>
                                        </h3>
                                        <p>Last Modified: {formatDate(modifiedDate)}</p>
                                    </div>
                                    <div className="noteItemRight">
                                        <button onSubmit={e => e.preventDefault()}>Delete note</button>
                                    </div>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <button className="newNoteButton" onSubmit={e => e.preventDefault()}>Add a note</button>
        </div>
    )
}

export default NotesList