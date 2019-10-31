import React from 'react'
import { Link } from 'react-router-dom'
import NotesContext from '../NotesContext'
import './Folders.css'

class Folders extends React.Component {
    static contextType = NotesContext
    render() {
        return (
            <div className="folders">
                <h2>Folders</h2>
                <ul className="folderList">
                    {this.context.folders.map(folder => {
                        const folderPath = `/folder/${folder.id}`
                        return (
                            <li className="folderListItem" key={folder.id}>
                                <Link className="folderName" to={folderPath}>
                                    {folder.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <button onSubmit={e => e.preventDefault()}>Add a folder</button>
            </div>
        )
    }
}

export default Folders