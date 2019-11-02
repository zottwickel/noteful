import React from 'react'
import { Link } from 'react-router-dom'
import NotesContext from '../NotesContext'
import AddFolder from './AddFolder'
import './Folders.css'

class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newFolder: false
        }
    }
    static contextType = NotesContext

    toggleNewFolder = (event) => {
        event.preventDefault()
        this.setState({
            newFolder: !this.state.newFolder
        })
    }

    render() {
        return (
            <>
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
                    <button onClick={e => this.toggleNewFolder(e)}>Add a folder</button>
                </div>
                {this.state.newFolder ? <AddFolder toggleNewFolder={this.toggleNewFolder} /> : null }
            </>
        )
    }
}

export default Folders