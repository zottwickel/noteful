import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Note.css'

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

function Note(props) {
    const id = useParams()
    console.log(id)
    const note = props.notes.find(note => note.id === id.noteid)
    const modifiedDate = new Date(note.modified)
    return (
        <>
            <div className="noteSelectItem">
                <div className="noteItemLeft">
                    <h3 className="noteTitle">{note.name}</h3>
                    <p>Last Modified: {formatDate(modifiedDate)}</p>
                </div>
                <div className="noteItemRight">
                    <button onSubmit={e => e.preventDefault()}>Delete note</button>
                </div>
            </div>
            <div className="noteBox">
                <h2>{note.name}</h2>
                <p>{note.content}</p>
            </div>
        </>
    )
}

export default Note