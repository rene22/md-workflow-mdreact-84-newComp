import { combineReducers } from 'redux';
// import pageSchemaReducer from './PageSchemaReducer';
import sidebarReducer from './SidebarReducer';
import serverReducer from './ServerReducer';
import mainContentReducer from './MainContentReducer';
import topbarReducer from './TopbarReducer';
import sessionInfoReducer from './SessionInfoReducer';
import dialogScreenReducer from './DialogScreenReducer';

export default combineReducers ({
    // pageSchemaReducer,
    sidebarReducer,
    serverReducer,
    mainContentReducer,
    topbarReducer,
    sessionInfoReducer,
    dialogScreenReducer
})