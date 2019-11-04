import React from 'react'
import NotesContext from '../NotesContext'
import PropTypes from 'prop-types'
import './AddFolder.css'

class AddFolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValid: true
    }
  }

  validate = (event) => {
    if (event.target.value.length < 3 || event.target.value.length >= 10) {
      this.setState({
        isValid: false
      })
    } else { 
      this.setState({ isValid: true })      
    }
  }

  static contextType = NotesContext
  render() {
    return (
      <div className="addFolderOverlay">
        <form 
          onSubmit={e => { 
            this.context.addFolder(e)
            this.props.toggleNewFolder(e)
          }} 
          className="addFolderForm"
        >
        <div className="toggleButton" onClick={e => this.props.toggleNewFolder(e)} >
          X
        </div>
          <h2>Add Folder</h2>
          <label htmlFor="name">
            Folder Name: <br />
            <input type="text" className="formField" name="name" id="name" onChange={e => this.validate(e)} required/>
          </label> <br />
          {!this.state.isValid ? <p className="invalid">Folder name must be between 3 and 10 letters.</p>: null }
          <button disabled={!this.state.isValid} type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

AddFolder.propTypes = {
  toggleNewFolder: PropTypes.func.isRequired
}

export default AddFolder