const INITIAL_STATE = {
    displayName: '', 
    email: '', 
    emailVerified: '', 
    photoURL: '',
    l: '',
    uid: ''
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {...state, ...action.user}
        case 'LOG_OUT':
            return {
                displayName: '', 
                email: '', 
                emailVerified: '', 
                photoURL: '',
                l: '',
                uid: '' }
        default:
            return state;
    }
}

export default userReducer