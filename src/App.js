import React from 'react';
import { Route, Link } from 'react-router-dom'
import NotesList from './NotesList/NotesList'
import Note from './Note/Note'
import Folders from './Folders/Folders'
import NotesContext from './NotesContext'
import './App.css';
import uuid from 'uuid'

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
    deleteNote: (noteid) => {
      fetch(`https://secure-spire-79205.herokuapp.com/api/notes/${noteid}`, { method: 'DELETE' })
        .then(
          this.setState({
            notes: this.state.notes.filter(note => note.id !== noteid)
          })
        )
        .catch(err => alert(err.message))
    },
    addFolder: (event) => {
      event.preventDefault()
      const newFolder = {
        id: uuid.v4(),
        folder_name: event.target.name.value
      }
      fetch('https://secure-spire-79205.herokuapp.com/api/folders', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFolder)
      })
        .then(
          this.setState({
            folders: this.state.folders.concat(newFolder)
          })
        )
        .catch(err => alert(err.message))
    },
    addNote: (event) => {
      event.preventDefault()
      const newNote = {
        id: uuid.v4(),
        note_name: event.target.name.value,
        content: event.target.content.value,
        folder_id: event.target.folder.value,
        date_modified: new Date()
      }
      fetch('https://secure-spire-79205.herokuapp.com/api/notes', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
      })
        .then(
          this.setState({
            notes: this.state.notes.concat(newNote)
          })
        )
        .catch(err => alert(err.message))
    }
  }

  componentDidMount() {
    fetch('https://secure-spire-79205.herokuapp.com/api/folders')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          folders: data
        })
      })
      .catch(err => alert(err.message));

    fetch('https://secure-spire-79205.herokuapp.com/api/notes')
      .then(response => response.json())
      .then(data => {
        this.setState({
          notes: data
        })
      })
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <div className="App">
        <nav className="topLink">
          <h1><Link className="logo" to='/'>Noteful</Link></h1>
        </nav>
        <main>
          <section className="foldersSection">
            <NotesContext.Provider value={this.state}>
              <Folders />
            </NotesContext.Provider>
          </section>
          <section className="noteSection">
            <NotesContext.Provider value={this.state}>
              <Route 
                exact path='/'
                render={(props) => {
                  return <NotesList {...props} />
                }}
              />
              <Route
                path='/folder/:folder_id'
                render={(props) => {
                  return <NotesList {...props} />
                }}
              />
              <Route
                path='/note/:note_id'
                render={(props) => {
                  return <Note {...props} />
                }}
              />
            </NotesContext.Provider>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
