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




// const INITIAL_STATE = [
//     {
//         id: 'j54309j8453f98453',
//         description: 'Cards',
//         notes: ''
//     },
//     {
//         id: 'j53f98453d90j809',
//         description: 'Rope',
//         notes: ''
//     },
//     {
//         id: '90j80923d87j22473j',
//         description: 'Mic Stand Table',
//         notes: ''
//     },
//     {
//         id: '08432j0823jfdd432904238j',
//         description: 'Invisible Thread',
//         notes: ''
//     },
//     {
//         id: 'd87j22473js87j2437',
//         description: 'Sharpie Marker',
//         notes: ''
//     }
// ]