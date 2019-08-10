import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import {firebase, googleAuthProvider } from './firebase/firebase';

const store = configureStore();
store.dispatch({type:'LOG_OUT'});
const state = store.getState();

console.log(state)

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(
    <div>Loading...</div>, 
    document.getElementById('root'));

firebase.auth().onAuthStateChanged( async (user) => {
    if(user)
    {
        await store.dispatch({type: 'LOG_IN', user: {
            displayName: user.displayName, 
            email: user.email, 
            emailVerified: user.emailVerified, 
            photoURL: user.photoURL,
            l: user.l,
            uid: user.uid
        }})
        await store.dispatch({type: 'SET_TRICKS', uid: user.uid})
        await store.dispatch({type: 'SET_PROPS', uid: user.uid})
        await ReactDOM.render(jsx, document.getElementById('root'));
    } else {
        store.dispatch({type: 'LOG_OUT'})
        ReactDOM.render(
            <div>
                <button className="btn btn-primary btn-lg" onClick={() => firebase.auth().signInWithPopup(googleAuthProvider)}>
                <i className="fas fa-sign-in-alt" ></i> Sign In With Google
                </button>
            </div>, 
            document.getElementById('root'));
    }})
    

// ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
