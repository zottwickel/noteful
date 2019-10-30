import React from 'react';
import { Route, Link } from 'react-router-dom'
import STORE from './STORE'
import NotesList from './NotesList/NotesList'
import Note from './Note/Note'
import Folders from './Folders/Folders'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav className="topLink">
          <h1><Link className="logo" to='/'>Noteful</Link></h1>
        </nav>
        <main>
          <section className="foldersSection">
            <Folders folders={STORE.folders} />
          </section>
          <section className="noteSection">
            <Route 
              exact path='/'
              render={({history}) => {
                return <NotesList notes={STORE.notes} />
              }}
            />
            <Route
              path='/folder/:folderid'
              render={({history}) => {
                return <NotesList notes={STORE.notes} />
              }}
            />
            <Route
              path='/note/:noteid'
              render={({history}) => {
                return <Note notes={STORE.notes} />
              }}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
