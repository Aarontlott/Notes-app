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
          date: Moment('03/02/2019, 09:54:21').format('Do MMM YYYY'),
          id: '1551608446446'
        },
        {
          heading: 'Test heading 2',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: Moment('03/01/2019, 09:54:21').format('Do MMM YYYY'),
          id: '1551608454660'
        },
        {
          heading: 'Test heading 3',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: Moment('02/25/2019, 09:54:21').format('Do MMM YYYY'),
          id: '1551608461557'
        },
        {
          heading: 'Test heading 4',
          text: 'Repellat nulla et facere consequatur aut consectetur.',
          date: Moment('03/03/2019, 09:54:21').format('Do MMM YYYY'),
          id: '1551608465639'
        }
      ], text: '' };
    
  }

  render() {
    Moment.locale('en');

    const addNote = () => {
      let newNote = {
        heading: 'Here is your new note...',
        text: 'Here is your new note...',
        date: Moment(Date.now()).format('Do MMM YYYY'),
        id: Date.now()
      };
      notes.push(newNote);
      this.setState(notes);
    };

    const notes = this.state.notes;

    return (
      <div className="App">
        <button onClick={addNote}>Add new note</button>
        <div className="notes"><RenderNotesList notesToRender={notes} /></div>
        <div className="note-text">Note text here</div>
      </div>
    );
  }
}


function RenderNotesList(props) {
  return (
    <ul>
     {props.notesToRender.map(note => (
          <li key={note.id}>{note.heading} <br /> <span>{note.date}</span></li>
        ))}
    </ul>
  );
}


export default App;
