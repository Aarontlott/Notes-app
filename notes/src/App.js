import React, { Component } from 'react';
import Moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [
        {
          heading: 'Excepturi itaque quidem quis o...',
          text: 'Excepturi itaque quidem quis optio modi ab velit. Velit dolore eos quaerat. Voluptas consequatur aut nihil iste blanditiis voluptates. Odit voluptatem neque omnis exercitationem eveniet ad hic.\n\nDolores aspernatur ut eveniet veritatis. Itaque quo voluptates voluptatem vero excepturi consequuntur qui dolore. Quis ipsum nihil animi labore.\n\nEst sequi explicabo sapiente provident voluptatem. Quis sed voluptas similique necessitatibus. Voluptatem est enim iure. Ut voluptas sit modi facere saepe maiores illo. Deleniti ut consequatur ullam ut provident expedita. Voluptatibus eos qui earum.\n\nConsequatur quia ratione ea magni est nihil. Similique earum pariatur qui quas beatae quo et. Ducimus optio et et asperiores. Eveniet et eligendi odio recusandae. Consequatur nemo accusamus odit sed quasi quia unde mollitia. Ipsum debitis et et dolor debitis sunt.\n\nDolor molestias quod et in totam. Et repellat quia nobis mollitia odit eos quia non. Quas cum non eaque omnis sed. Consequatur asperiores sapiente sit autem qui sit. Id non voluptatem ut magni optio. Occaecati velit saepe eos culpa sunt iure accusantium.',
          date: 1547942400000,
          active: ''
        },
        {
          heading: 'Voluptas consequatur aut nihil...',
          text: 'Voluptas consequatur aut nihil iste blanditiis voluptates. Odit voluptatem neque omnis exercitationem eveniet ad hic.',
          date: 1549152000000,
          active: ''
        },
        {
          heading: 'Dolores aspernatur ut eveniet...',
          text: 'Dolores aspernatur ut eveniet veritatis. Itaque quo voluptates voluptatem vero excepturi consequuntur qui dolore. Quis ipsum nihil animi labore.',
          date: 1550275200000,
          active: ''
        },
        {
          heading: 'Est sequi explicabo',
          text: 'Est sequi explicabo\n\nsapiente provident voluptatem. Quis sed voluptas similique necessitatibus. Voluptatem est enim iure.',
          date: 1551312000000,
          active: ''
        },
        {
          heading: 'Consequatur quia ratione ea ma...',
          text: 'Consequatur quia ratione ea magni est nihil. Similique earum pariatur qui quas beatae quo et. Ducimus optio et et asperiores. Eveniet et eligendi odio recusandae. Consequatur nemo accusamus odit sed quasi quia unde mollitia. Ipsum debitis et et dolor debitis sunt.',
          date: 1550793600000,
          active: ''
        },
        {
          heading: 'Dolor molestias',
          text: 'Dolor molestias\n\nquod et in totam. Et repellat quia nobis mollitia odit eos quia non. Quas cum non eaque omnis sed.',
          date: 1549324800000,
          active: 'active'
        }
      ], 
      text: 'Dolor molestias\n\nquod et in totam. Et repellat quia nobis mollitia odit eos quia non. Quas cum non eaque omnis sed.',
      active: 1549324800000, 
       };
    
  }

  render() {
    Moment.locale('en');
    // Setup some variables for our notes
    const notes = this.state.notes;
    const activeText = this.state.text;

    // Adding a new note
    const addNote = () => {
      let newNote = {
        heading: 'Here is your new note',
        text: 'Here is your new note',
        date: Date.now(),
        active: 'active'
      };
      // Reset the active values
      for (var value of notes) {value.active = ''}
      // Add our new note
      notes.push(newNote);
      // Push that new info to the state
      this.setState(state => ({
        notes: notes,
        text: 'Here is your new note',
        active: Date.now()
      }));
    };

    const makeActive = (e) => {
      // Make a note active
      let textShown;
      let activeNote;
      for (var value of notes) {
        if (value.date === parseInt(e.target.id)) {
          // Set the active notes text to the textarea value
          value.active = 'active';
          textShown = value.text;
          activeNote = value.date;
        } else {
          // Otherwise clear it
          value.active = '';
        }
      }
      // Set the states
      this.setState(state => ({
        notes: notes,
        text: textShown,
        active: activeNote
      }));
    };

    const generateHeading = (text) => {
      // Generate a heading
      let result;
      if (text.substring(0,30).indexOf('\n') > 0) {
        // If we find a newline under 30 chars, that's our heading
        result = text.substring(0,30).split('\n')[0];
      } else {
        // Otherwise first 30 and a ... if above that needed
        result = text.substring(0,30);
        if (text.length > 30) result += '...'
      }
      return result; 
    };

    const updateText = (e) => {
      // Update the textarea and save our progress
      this.setState({text: e.target.value});
      for (var note of notes) {
        if (note.date === this.state.active) {
          // Taking care to generate a new heading
          note.text = e.target.value;
          note.heading = generateHeading(note.text);
          break;
        }
      }
    };

    return (
      <div className="App">
        <div className="buttonContainer">
          <button onClick={addNote}>Add New Note</button>
          <CreatedTag date={this.state.active}/>
        </div>
        <div className="notes"><RenderNotesList notesToRender={notes} onClickFunction={makeActive} /></div>
        <div className="note-text"><NoteTextArea textToShow={activeText} onChangeFunction={updateText} /></div>
      </div>
    );
  }
}

function NoteTextArea(props) {
  const handleUpdate = (e) => props.onChangeFunction(e);
  return(
    <textarea value={props.textToShow} onChange={handleUpdate} />
  );
}

function RenderNotesList(props) {
  props.notesToRender.sort(function (a, b) {
    return b.date - a.date;
  });
  const handleClick = (e) => props.onClickFunction(e);
  return (
    <ul id="notesContainer">
     {props.notesToRender.map(note => (
          <li key={note.date} className={note.active}><button id={note.date} onClick={handleClick}>{note.heading} <br /> <span id={note.date}>{Moment(note.date).format('Do MMM YYYY')}</span></button></li>
        ))}
    </ul>
  );
}

function CreatedTag(props) {
  return (
    <div className="createdDate">
      Created: {Moment(props.date).format('Do MMM YYYY')}
    </div>
  );
}


export default App;
