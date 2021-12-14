const INITIAL_STATE = {
    buttonList: [],
    caption: null,
    messageList: [],
    fieldList: [],
    gridList: [],
    navList: [],
    hiddenFields: [],
    headCheckboxList: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_MAIN_CONTENT_BUTTON_LIST':
            return {
                ...state,
                buttonList: action.payload
            }
        case 'SET_MAIN_CONTENT_MSG_LIST':
            return {
                ...state,
                messageList: action.payload
            }
        case 'SET_MAIN_CONTENT_CAPTION':
            return {
                ...state,
                caption: action.payload
            }
        case 'SET_MAIN_CONTENT_FIELD_LIST':
            return {
                ...state,
                fieldList: action.payload
            }
        case 'SET_MAIN_CONTENT_GRID_LIST':
            return {
                ...state,
                gridList: action.payload
            }
        case 'SET_MAIN_CONTENT_NAVLIST':
            return {
                ...state,
                navList: action.payload
            }
        case 'SET_MAIN_CONTENT_GRID_HIDDEN_FLDS':
            return {
                ...state,
                hiddenFields: action.payload
            }
        case 'SET_MAIN_CONTENT_HEAD_CHECKBOX_LIST':
            return {
                ...state,
                headCheckboxList: action.payload
            }
        case 'RESET':
            return INITIAL_STATE; //Always return the initial state
        default:
            return state;
    }
}