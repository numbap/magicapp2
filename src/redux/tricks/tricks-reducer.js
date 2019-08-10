import { takeEvery } from "redux-saga/effects";

const INITIAL_STATE = [
]


const tricksReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ADD_TRICK_ASYNC':
            return state.filter(x => x.id !== action.trick.id).concat(action.trick)
        case 'DELETE_TRICK_ASYNC':
            return state.filter(x => x.id !== action.trickId)
        case 'SET_TRICKS_ASYNC':
            console.log('setting tricks', action.tricks)
            return action.tricks
        case 'ADD_PROP_TO_TRICK_ASYNC':
            var tmp = state
            tmp.filter(x => x.id === action.trickId)[0].props.push(action.prop)
            return tmp
        case 'DELETE_PROP_FROM_TRICK_ASYNC':
            var tmp = state
            tmp.filter(x => x.id === action.trickId)[0].props = tmp.filter(x => x.id === action.trickId)[0].props.filter(x => x.id !== action.propId)
            return tmp
        default:
            return state;
    }
}

export default tricksReducer