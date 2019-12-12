import React from 'react'
import NotesContext from '../NotesContext'
import PropTypes from 'prop-types'
import './AddNote.css'

class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameValid: true,
      contentValid: true,
    }
  }

  static contextType = NotesContext

  validateName = (event) => {
    if (event.target.value.length === 0 || event.target.value.length >= 10) {
      this.setState({
        nameValid: false
      })
    } else { 
      this.setState({
        nameValid: true
      })
    }
  }

  validateContent = (event) => {
    if (event.target.value.length === 0 || event.target.value.length >= 1000) {
      this.setState({
        contentValid: false
      })
    } else {
      this.setState({
        contentValid: true
      })
    }
  }

  render() {
    const foldersList = this.context.folders
    return (
      <div className="addNoteOverlay">        
        <form 
          onSubmit={e => { 
            this.context.addNote(e)
            this.props.toggleNewNote(e)
          }}
          className="addNoteForm"
        >
        <div className="toggleButton" onClick={e => this.props.toggleNewNote(e)} >
          X
        </div>
        <h2>Add Note</h2>
        <label htmlFor="name">
          Note Name: <br />
          <input type="text" className="formField" name="name" id="name" onChange={e => this.validateName(e)} required/>
        </label><br />
        {!this.state.nameValid ? <p className="invalid">Name must be between 1 and 10 characters long.</p> : null}
        <label htmlFor="content">
          Note Content: <br />
          <textarea className="textArea" name="content" id="content" onChange={e => this.validateContent(e)} required/>
        </label><br />
        {!this.state.contentValid ? <p className="invalid">Content must be between 1 and 1000 characters long.</p> : null}
        <label htmlFor="folder">
          Folder:
          <select name="folder" id="folder">
            {foldersList.map(folder => {
              return (
                <option key={folder.id} value={folder.id}>
                  {folder.folder_name}
                </option>
              )
            })}
          </select>
        </label><br />
        <button disabled={!this.state.nameValid && !this.state.contentValid} type="submit">
          Submit
        </button>
      </form>
    </div>
    )
  }
}

AddNote.poroptypes = {
  toggleNewNote: PropTypes.func.isRequired
}

export default AddNote