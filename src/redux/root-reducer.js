import {combineReducers} from 'redux'

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import tricksReducer from './tricks/tricks-reducer'
import propsReducer from './props/props-reducer'
import userReducer from './user/user-reducer'
import currentTrickReducer from './current-trick/current-trick-reducer';
import notesReducer from './notes/notes-reducer'

const rootReducer = combineReducers({
    tricks: tricksReducer,
    props: propsReducer,
    user: userReducer,
    currentTrick: currentTrickReducer,
    notes: notesReducer
})

export default rootReducer