const INITIAL_STATE = []

const propsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ADD_PROP_ASYNC':
            return state.filter(x => x.id !== action.prop.id).concat(action.prop)
        case 'DELETE_PROP_ASYNC':
            return state.filter(x => x.id !== action.propId)
        case 'SET_PROPS_ASYNC':
            return action.props
        default:
            return state;
    }
}

export default propsReducer

