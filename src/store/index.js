import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import recipeReducer from '../reducers/recipeReducer';

// const reducer = combineReducers({ dummyReducer });

const store = createStore(recipeReducer, applyMiddleware(thunk));

export default store;
