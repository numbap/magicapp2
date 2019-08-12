const INITIAL_STATE = []

const notesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ADD_NOTE_ASYNC':
            return state.filter(x => x.id !== action.noteId).concat(action.note)
        case 'DELETE_NOTE_ASYNC':
            return state.filter(x => x.id !== action.noteId)
        case 'SET_NOTES_ASYNC':
            return action.notes
        default:
            return state;
    }
}

export default notesReducer

