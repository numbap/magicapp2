const INITIAL_STATE = {
    id:'',
    name:'',
    script:'',
    props:[]
}


const currentTrickReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_TRICK_ASYNC':
            console.log(action.trick, "<= setting current trick")
            return action.trick
        case 'CLEAR_CURRENT_TRICK':
                return INITIAL_STATE
        default:
            return state;
    }
}

export default currentTrickReducer