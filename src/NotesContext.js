import React from 'react'

const NotesContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFolder: () => {}
})

export default NotesContext