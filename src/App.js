import React from 'react';
import { Route, Link } from 'react-router-dom'
import NotesList from './NotesList/NotesList'
import Note from './Note/Note'
import Folders from './Folders/Folders'
import NotesContext from './NotesContext'
import './App.css';

function generateId() {
  return Math.random().toString(36).substr(2, 8) + '-ffaf-11e8-8eb2-f2801f1b9fd1'
}

function generateDate() {
  const date = new Date()
  const year = date.getUTCFullYear().toString()
  let month = date.getUTCMonth().toString()
  if (month.length === 1) { month = "0" + month }
  let day = date.getUTCDate().toString()
  if (day.length === 1) { day = "0" + day }
  let hours = date.getUTCHours().toString()
  if (hours.length === 1) { hours = "0" + hours }
  let minutes = date.getUTCMinutes().toString()
  if (minutes.length === 1) { minutes = "0" + minutes }
  let seconds = date.getUTCSeconds().toString()
  if (seconds.length === 1) { seconds = "0" + seconds }
  let milliseconds = date.getUTCMilliseconds().toString()
  if (milliseconds.length === 1) { 
    milliseconds = "00" + milliseconds 
  } else if (milliseconds.length === 2) {
    milliseconds = "0" + milliseconds
  }
  const time = hours + ":" + minutes + ":" + seconds + "." + milliseconds
  return year + '-' + month + '-' + day + 'T' + time + 'Z'
}

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
    deleteNote: (noteid) => {
      fetch(`http://localhost:9090/notes/${noteid}`, { method: 'DELETE' })
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
        id: generateId(),
        name: event.target.name.value
      }
      fetch('http://localhost:9090/folders', {
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
        id: generateId(),
        name: event.target.name.value,
        content: event.target.content.value,
        folderId: event.target.folder.value,
        modified: generateDate()
      }
      fetch('http://localhost:9090/notes', {
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
    fetch('http://localhost:9090/folders')
      .then(response => response.json())
      .then(data => {
        this.setState({
          folders: data
        })
      })
      .catch(err => alert(err.message));

    fetch('http://localhost:9090/notes')
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
                path='/folder/:folderid'
                render={(props) => {
                  return <NotesList {...props} />
                }}
              />
              <Route
                path='/note/:noteid'
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
