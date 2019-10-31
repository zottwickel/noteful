import React from 'react';
import { Route, Link } from 'react-router-dom'
import NotesList from './NotesList/NotesList'
import Note from './Note/Note'
import Folders from './Folders/Folders'
import NotesContext from './NotesContext'

import './App.css';

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
