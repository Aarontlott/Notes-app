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
          active: ''
        },
        {
          heading: 'Test heading 2',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1549152000000,
          active: ''
        },
        {
          heading: 'Test heading 3',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1550275200000,
          active: ''
        },
        {
          heading: 'Test heading 4',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: 1551312000000,
          active: ''
        }
      ], text: '' };
    
  }

  render() {
    Moment.locale('en');
    const notes = this.state.notes;
    var textShown = this.state.text;
    console.log(textShown);

    const addNote = () => {
      let newNote = {
        heading: 'Here is your new note...',
        text: 'Here is your new note...',
        date: Date.now(),
        active: 'active'
      };
      for (var value of notes) {value.active = ''}
      notes.push(newNote);
      this.setState(notes);
    };

    const makeActive = (e) => {
      // console.log(e.target.id);
      for (var value of notes) {
        if (value.date === parseInt(e.target.id)) {
          value.active = 'active';
          textShown = value.text;
        } else {
          value.active = '';
        }
      }
      this.setState(notes);
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
  const handleClick = (e) => {
    props.onClickFunction(e);
    // document.querySelector('#notesContainer li').className = '';
    // e.target.className = "active";
  };
  return (
    <ul id="notesContainer">
     {props.notesToRender.map(note => (
          <li key={note.date} className={note.active}><button id={note.date} onClick={handleClick}>{note.heading} <br /> {Moment(note.date).format('Do MMM YYYY')}</button></li>
        ))}
    </ul>
  );
}


export default App;
