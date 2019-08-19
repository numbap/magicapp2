import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import uuid from 'uuid'
import userReducer from './redux/user/user-reducer'
import tricksReducer from './redux/tricks/tricks-reducer'
import propsReducer from './redux/props/props-reducer'
import notesReducer from './redux/notes/notes-reducer'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Header from './components/header/header'
import AddTrick from './components/add-trick/add-trick'
import EditProps from './components/edit-props/edit-props'
import EditScript from './components/edit-script/edit-script'
import configureStore from './store/store';
import {Provider} from 'react-redux'
import EditTrick from './components/edit-trick/edit-trick'
import NoteForm from './components/note-form/note-form'
import NotFound from './components/notfound/notfound'
import PropList from './components/proplist/proplist'
import TrickListing from './components/trick-listing/trick-listing'



const store = configureStore();
const state = store.getState();

const defaultTrickState = [
{
  id: "10",
  props:[],
  name: "Tenth sample trick",
  script: "<p>This is the tenth sample script. 10 10 10 10 10 10 10 10. </p>"
},
{
  id: "20",
  props:[],
  name: "Twentieth sample trick",
  script: "<p>This is the Twentieth sample script. 20 20 20 20 20 20 20 20. </p>"
},
{
  id: "30",
  props:[{description: 'PropToDelete', id: '543543543543543453', propId: '6', quantity: '4'}],
  name: "Thirtieth sample trick",
  script: "<p>This is the thirtieth sample script. 30 30 30 30 30 30 30 30 30 30. </p>"
}]

const defaultPropsState = [
  {description: 'One', id: '1', notes: ''},
  {description: 'Two', id: '2', notes: ''},
  {description: 'Three', id: '3', notes: ''}
]


const defaultNotesState = [
  {body: 'Note One', date:"", header:'', id:'555555555', trickId:'1'},
  {body: 'Note Two', date:"", header:'', id:'666666666', trickId:'2'},
  {body: 'Note Three', date:"", header:'', id:'777777777', trickId:'3'},
  {body: 'Note Four', date:"", header:'', id:'888888888', trickId:'4'}
]


function funco(a, b){
  return a + b
} 

function objecto(z){
  return z
}

test('Add 3 + 4', () => {
  expect(funco(3, 6)).toBe(9)
})

test('Check object', () => {
  expect(objecto({i:"Hello", f:"Youthere", l:"Buddy"})).toEqual({i:"Hello", f:"Youthere", l:"Buddy"})
})

test('Check object with rando', () => {
  expect(objecto({i:"Hello", f:"Youthere", l:uuid()})).toEqual({i:"Hello", f:"Youthere", l:expect.any(String)})
})

test('test user reducer', () => {
  const state = userReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({
    displayName: '', 
    email: '', 
    emailVerified: '', 
    photoURL: '',
    l: '',
    uid: ''
  })
})

test('log user in', () => {
  const state = userReducer(undefined, {type: 'LOG_IN', user: { displayName:'Patrick Jobin', email: 'p@rickjobin.com', uid: '12345'}})
  expect(state).toEqual({
    displayName: 'Patrick Jobin', 
    email: 'p@rickjobin.com', 
    emailVerified: '', 
    photoURL: '',
    l: '',
    uid: '12345'
  })
})

test('log user out', () => {
  let state = userReducer(undefined, {type: 'LOG_IN', user: { displayName:'Patrick Jobin', email: 'p@rickjobin.com', uid: '12345'}})
  state = userReducer(undefined, {type: 'LOG_OUT'})
  expect(state).toEqual({
    displayName: '', 
    email: '', 
    emailVerified: '', 
    photoURL: '',
    l: '',
    uid: ''
  })
})

test('test tricks reducer', () => {
  const state = tricksReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})


test('add a trick Asynchronously, without props', () => {
  const state = tricksReducer(defaultTrickState, {type: 'ADD_TRICK_ASYNC', trick: {
    id: "1",
    props:[],
    name: "First sample trick",
    script: "<p>This is the first sample script. Plot out the script of your trick here. </p>"
}})
  expect(state).toEqual(defaultTrickState.concat({
        id: "1",
        props:[],
        name: "First sample trick",
        script: "<p>This is the first sample script. Plot out the script of your trick here. </p>"
    }))
})



test('add a trick Asynchronously, with props', () => {
  const state = tricksReducer(defaultTrickState, {type: 'ADD_TRICK_ASYNC', trick: {
    id: "1",
    props:['0192839485', '34943845954', '243432432432', 'dsdsasda99889dsa'],
    name: "First sample trick",
    script: "<p>This is the first sample script. Plot out the script of your trick here. </p>"
}})
  expect(state).toEqual(defaultTrickState.concat({
        id: "1",
        props:['0192839485', '34943845954', '243432432432', 'dsdsasda99889dsa'],
        name: "First sample trick",
        script: "<p>This is the first sample script. Plot out the script of your trick here. </p>"
    }))
})


test('Delete a trick Asynchronously', () => {
  const state = tricksReducer(defaultTrickState, {type: 'DELETE_TRICK_ASYNC', trickId: '20'})
  expect(state).toEqual([
    {
      id: "10",
      props:[],
      name: "Tenth sample trick",
      script: "<p>This is the tenth sample script. 10 10 10 10 10 10 10 10. </p>"
    },
    {
      id: "30",
      props:[{description: 'PropToDelete', id: '543543543543543453', propId: '6', quantity: '4'}],
      name: "Thirtieth sample trick",
      script: "<p>This is the thirtieth sample script. 30 30 30 30 30 30 30 30 30 30. </p>"
    }])
})


test('Set tricks Asynchronously', () => {
  const state = tricksReducer(defaultTrickState, {type: 'SET_TRICKS_ASYNC', tricks: [
    {
      id: "55",
      props:['gggg', 'hhhhh', 'llllll', 'mmmmmm'],
      name: "dflkdjldksfjdsfjldjsflkdsfkjdsf",
      script: "<p>10 10 10 10 10 10 10 10. </p>"
    },
    {
      id: "44",
      props:[],
      name: "kfsds;dfjfds;ldsf;dsfjdsfdsf",
      script: "<p>s0 20 20 20 20 20 20 20. </p>"
    },
    {
      id: "33",
      props:['gggg', 'hhhhh'],
      name: "osdfidsfpoisdfipsdfiosdf",
      script: "<p>30 30 30 30 30 30 30 30 30 30. </p>"
    }]})
  expect(state).toEqual([
    {
      id: "55",
      props:['gggg', 'hhhhh', 'llllll', 'mmmmmm'],
      name: "dflkdjldksfjdsfjldjsflkdsfkjdsf",
      script: "<p>10 10 10 10 10 10 10 10. </p>"
    },
    {
      id: "44",
      props:[],
      name: "kfsds;dfjfds;ldsf;dsfjdsfdsf",
      script: "<p>s0 20 20 20 20 20 20 20. </p>"
    },
    {
      id: "33",
      props:['gggg', 'hhhhh'],
      name: "osdfidsfpoisdfipsdfiosdf",
      script: "<p>30 30 30 30 30 30 30 30 30 30. </p>"
    }])
})

test('Add props to trick, Async', () => {
  const state = tricksReducer(defaultTrickState, {type: 'ADD_PROP_TO_TRICK_ASYNC', trickId: '20', prop:{description: 'This Prop', id: '99999999', propId: '1', quantity: '1'}})
  expect(state).toEqual([
    {
      id: "10",
      props:[],
      name: "Tenth sample trick",
      script: "<p>This is the tenth sample script. 10 10 10 10 10 10 10 10. </p>"
    },
    {
      id: "20",
      props:[{description: 'This Prop', id: '99999999', propId: '1', quantity: '1'}],
      name: "Twentieth sample trick",
      script: "<p>This is the Twentieth sample script. 20 20 20 20 20 20 20 20. </p>"
    },
    {
      id: "30",
      props:[{description: 'PropToDelete', id: '543543543543543453', propId: '6', quantity: '4'}],
      name: "Thirtieth sample trick",
      script: "<p>This is the thirtieth sample script. 30 30 30 30 30 30 30 30 30 30. </p>"
    }])
})

test('Delete a prop from a trick ------', () => {
  const state = tricksReducer(defaultTrickState, {type: 'DELETE_PROP_FROM_TRICK_ASYNC', trickId: '30', propId: '543543543543543453'})
  expect(state).toEqual([
    {
      id: "10",
      props:[],
      name: "Tenth sample trick",
      script: "<p>This is the tenth sample script. 10 10 10 10 10 10 10 10. </p>"
    },
    {
      id: "20",
      props:[{description: 'This Prop', id: '99999999', propId: '1', quantity: '1'}],
      name: "Twentieth sample trick",
      script: "<p>This is the Twentieth sample script. 20 20 20 20 20 20 20 20. </p>"
    },
    {
      id: "30",
      props:[],
      name: "Thirtieth sample trick",
      script: "<p>This is the thirtieth sample script. 30 30 30 30 30 30 30 30 30 30. </p>"
    }])
})


test('Add a prop asynchronously', () => {
  const state = propsReducer(defaultPropsState, {type: 'ADD_PROP_ASYNC', prop: {description: 'Flubber', id: '999', notes: ''}})
  expect(state).toEqual(defaultPropsState.concat({description: 'Flubber', id: '999', notes: ''}))
})

test('Delete prop async', () => {
  const state = propsReducer(defaultPropsState, {type: 'DELETE_PROP_ASYNC', propId: '2'})
  expect(state).toEqual([
    {description: 'One', id: '1', notes: ''},
    {description: 'Three', id: '3', notes: ''}
  ])
})


test('Set props asynchronously', () => {
  const state = propsReducer(defaultPropsState, {type: 'SET_PROPS_ASYNC', props: defaultPropsState})
  expect(state).toEqual(defaultPropsState)
})



test('Add Note Synchronously', () => {
  const state = notesReducer(defaultNotesState, {type: 'ADD_NOTE_ASYNC', note: {body: 'Tenth Note', date:"", header:'', id:'10101010101', trickId:'10'}})
  expect(state).toEqual(defaultNotesState.concat({body: 'Tenth Note', date:"", header:'', id:'10101010101', trickId:'10'}))
})


test('Delete notes anynchronously', () => {
  const state = notesReducer(defaultNotesState, {type: 'DELETE_NOTE_ASYNC', noteId:'777777777'})
  expect(state).toEqual([
    {body: 'Note One', date:"", header:'', id:'555555555', trickId:'1'},
    {body: 'Note Two', date:"", header:'', id:'666666666', trickId:'2'},
    {body: 'Note Four', date:"", header:'', id:'888888888', trickId:'4'}
  ])
})

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


test('should render header correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})


test('should render Add Trick correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(    
    <Provider store={store}>
      <AddTrick  />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('should render Edit Props correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <EditProps />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('should render Edit Script correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <EditScript />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('should render Edit Script correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <EditTrick />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})


test('should render Note Form correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <NoteForm />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('should render Not Found correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <NotFound />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('should render Prop List correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <PropList />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})


test('should render Trick Listing correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(
    <Provider store={store}>
      <TrickListing />
    </Provider>);
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

