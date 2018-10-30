import React, { Component } from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import './App.css';
import NotesList from './components/containers/NotesList/NotesList';
import CreateNotes from './components/containers/CreateNotes/CreateNotes';
import Layout from './components/UI/layout/layout';
import Registration from './components/containers/Registeration/Registeration';
import Login from './components/containers/Login/Login';
import Document from './components/containers/Documents/Documents';
import { connect } from 'react-redux';
import * as actionIndex from './store/actions/index';
class App extends Component {

  componentWillMount(){
    if(localStorage.getItem('token')!==null){
    this.props.onCheckLogin(localStorage.getItem('token'));
    }
  }
  render() {
    return (
      <div className="">
      <Layout>
      <Switch>

      <Route path="/" exact component={Login}/>
      <Route path="/create-notes" component={CreateNotes}/>
      <Route path="/registration" component={Registration}/>
      <Route path="/NotesList"  component={NotesList}/>
      <Route path="/document"  component={Document}/>
      </Switch>
      </Layout>
      </div>
    );
  }
}

const mapDispatchToprop=dispatch=>{

  return{
    onCheckLogin:(token)=>dispatch(actionIndex.checkLogin(token))
  }
}

export default withRouter (connect(null,mapDispatchToprop)(App));
