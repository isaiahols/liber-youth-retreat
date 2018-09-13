import { createStore, applyMiddleware } from "redux";
import reducer from './Ducks/registration';
// import thunk from "redux-thunk";
import promise from 'redux-promise-middleware';
// import { throttle } from 'lodash/throttle'

// import { loadState, saveState } from './localStorage';

// const persistedState = loadState();

const middleware = applyMiddleware( promise())

const store = createStore(
    reducer,
    // persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);


// store.subscribe(throttle(() => {
//     saveState({
//         participant: store.getState().participant
//     })
// }, 1000));

export default store;