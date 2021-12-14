const INITIAL_STATE = {
    header: null,
    links: null,
    dfdlinks: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_SIDEBAR_HEADER':
            return {
                ...state,
                header: action.payload
            }
        case 'SET_SIDEBAR_LINKS':
            return {
                ...state,
                links: action.payload
            }
        case "SET_SIDEBAR_DFDLINK":
            return {
                ...state,
                dfdlinks: action.payload,
            };
        case 'RESET':
            return INITIAL_STATE; //Always return the initial state
        default:
            return state;
    }
}