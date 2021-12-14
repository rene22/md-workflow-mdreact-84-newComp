const INITIAL_STATE = {
    sessionInfo: {
        jobNumber: null,
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_SESSION_INFO':
            return {
                ...state,
                sessionInfo: action.payload
            }
        case 'RESET':
            return INITIAL_STATE; //Always return the initial state
        default:
            return state;
    }
}