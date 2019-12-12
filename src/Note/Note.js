import React from 'react'
import NotesContext from '../NotesContext'
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

class Note extends React.Component {
    static contextType = NotesContext
    render() {
        const id = this.props.match.params.note_id
        let note = this.context.notes
        note = note.find(note => note.id == id)
        if (!note) { note = {} }
        const modifiedDate = new Date(note.date_modified)
        if (note.id) {
            return (
                <>
                    <div className="noteSelectItem">
                        <div className="noteItemLeft">
                            <h3 className="singleNoteTitle">{note.note_name}</h3>
                            <p>Last Modified: {formatDate(modifiedDate)}</p>
                        </div>
                        <div className="noteItemRight">
                            <button onClick={() => this.context.deleteNote(note.id)}>Delete note</button>
                        </div>
                    </div>
                    <div className="noteBox">
                        <h2>{note.note_name}</h2>
                        <p>{note.content}</p>
                    </div>
                </>
            )
        } else { 
            return (
                <div className="noteBox">
                    <h2>The note you are trying to view does not exist.</h2>
                </div>
            )
        }
    }
}

export default Note