import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NotesList from './components/containers/NotesList/NotesList';
import CreateNotes from './components/containers/CreateNotes/CreateNotes';

class App extends Component {
  render() {
    return (
      <div className="">
      <Switch>
      <Route path="/" exact component={NotesList}/>
      <Route path="/create-notes" component={CreateNotes}/>
      </Switch>
      </div>
    );
  }
}

export default App;
