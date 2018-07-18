import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import createNotesReducer from './store/reducers/createNotes';

const composeEnhancers = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const store = createStore(createNotesReducer,(
    applyMiddleware(thunk)
  ));

const app=(
    <Provider store={store} >
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
