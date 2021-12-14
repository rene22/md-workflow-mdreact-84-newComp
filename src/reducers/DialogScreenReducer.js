const INITIAL_STATE = {
    dialogButtonList: [],
    dialogCaption: null,
    dialogMessageList: [],
    dialogFieldList: [],
    dialogGridList: [],
    dialogHiddenFields: [],
    dialogHeadCheckboxList: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_DIALOG_BUTTON_LIST':
            return {
                ...state,
                dialogButtonList: action.payload
            }
        case 'SET_DIALOG_MSG_LIST':
            return {
                ...state,
                dialogMessageList: action.payload
            }
        case 'SET_DIALOG_CAPTION':
            return {
                ...state,
                dialogCaption: action.payload
            }
        case 'SET_DIALOG_FIELD_LIST':
            return {
                ...state,
                dialogFieldList: action.payload
            }
        case 'SET_DIALOG_GRID_LIST':
            return {
                ...state,
                dialogGridList: action.payload
            }
        case 'SET_DIALOG_GRID_HIDDEN_FLDS':
            return {
                ...state,
                dialogHiddenFields: action.payload
            }
        case 'SET_DIALOG_HEAD_CHECKBOX_LIST':
            return {
                ...state,
                dialogHeadCheckboxList: action.payload
            }
        case 'RESET':
            return INITIAL_STATE; //Always return the initial state
        default:
            return state;
    }
}