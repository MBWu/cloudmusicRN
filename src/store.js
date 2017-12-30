import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import musicControlReducer from './reducer/musicControlReducer.js';
import audioSonglistReducer from './reducer/audioSonglistReducer.js';

const reducers = combineReducers( {

    audioSonglist: audioSonglistReducer,
    musicControl : musicControlReducer,
} );

const middleware = applyMiddleware( promiseMiddleware(), thunk );

// const middleware = applyMiddleware( promiseMiddleware(), thunk, logger );

const store = createStore( reducers, middleware );

export default store;