import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import tweetsReducer from './store/ducks/tweets';

export const store = createStore(
    combineReducers({
        tweets: tweetsReducer
    }),
    applyMiddleware(thunkMiddleware)
);
