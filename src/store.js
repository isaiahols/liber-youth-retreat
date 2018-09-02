import { createStore, applyMiddleware } from "redux";
import reducer from './Ducks/registration';
import thunk from "redux-thunk";
import promise from 'redux-promise-middleware'

const middleware = applyMiddleware(thunk, promise())

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);