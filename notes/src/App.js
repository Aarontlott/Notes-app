import React, { Component } from 'react';
import Moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [
        {
          heading: 'Test heading 1',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1547942400000,
          active: false
        },
        {
          heading: 'Test heading 2',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1549152000000,
          active: false
        },
        {
          heading: 'Test heading 3',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1550275200000,
          active: false
        },
        {
          heading: 'Test heading 4',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1551312000000,
          active: false
        }
      ], text: '' };
    
  }

  render() {
    Moment.locale('en');

    const addNote = () => {
      let newNote = {
        heading: 'Here is your new note...',
        text: 'Here is your new note...',
        date: Date.now(),
        active: true
      };
      notes.push(newNote);
      this.setState(notes);
    };

    const notes = this.state.notes;
    const makeActive = (e) => {
      console.log(e.target);
    };

    return (
      <div className="App">
        <button onClick={addNote}>Add New Note</button>
        <div className="notes"><RenderNotesList notesToRender={notes} onClickFunction={makeActive} /></div>
        <div className="note-text"><NoteTextArea /></div>
      </div>
    );
  }
}

function NoteTextArea(props) {
  return(
    <textarea>
      {props.text}
    </textarea>
  );
}

function RenderNotesList(props) {
  props.notesToRender.sort(function (a, b) {
    return b.date - a.date;
  });
  const handleClick = (e) => props.onClickFunction(e);
  return (
    <ul>
     {props.notesToRender.map(note => (
          <li key={note.date}><button id={note.date} onClick={handleClick}>{note.heading} <br /> <span>{Moment(note.date).format('Do MMM YYYY')}</span></button></li>
        ))}
    </ul>
  );
}


export default App;
