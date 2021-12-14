
const INITIAL_STATE = {
    user: null,

    reqAction: "",
    reqFunction: "W.PROJ.LST",
    reqLangId: "E",
    reqRequestCode: "",
    reqScreen: "",
    reqThread: "",

    action: null,
    function: null,
    langid: null,
    requestCode: null,
    screen: null,
    thread: null,

    serverResp: null,
    pageResp: null,

    // dialogBoxResp: null,
    // dialogScreen: null,

    frameLoad: false,
    baseTemplates: {},
    dfdData: null,
    ddlList: [
        "FRSTS", "FRLOC", "FAGP", "FLVL", "FRFPT", "FCSTS", "MDAGP", "RLRLOC", "MDLVL", "FPROD", "FVER", "NEWVER", "CSTLND", "MDLOCT", "MDLVLT", "MDLOCP", "MDLVLP", "PRDDIF", "MDSSL", "MDOURL", "PRLOC", "MDRSN", "MDFLVL", "MDINTS", "MDRLOC", "FOBJT", "FOBJA", "FOBJS", "OGLVL", "FOLVL", "OGAGP", "OGEAGP", "MDTSKT", "PTSTS", "MDROLE", "FPHAS", "MDPHAS", "FPRI", "FSTS", "FCFLDP", "FPRJT", "MMPRJT", "MMPRI", "MMSTS", "FTSTS", "MHINTS", "MHTSTS", "RPTNAM", "MDTGTS", "MDFSTS", "FFSTS", "FTGTS", "FRFPA", "MDRFPA", "MDSTMN", "MDSTMX", "FREFT", "FTSKS", "FCFLDT", "FTSKT", "FNSTS", "MDNSTS", "MDPRI", "MDTSKS", "MDSELF", "MDSELT", "MDFLDT", "MDDDLV", "MDVISS", "MDREQS", "MDEDFS", "MDEDTS", "FACOD", "FMFLD", "FSGRP"
    ],
    ddlData: {},
    awaitResponse: false,
    startupConfigs: null,
    mdinstance: null,
    appRefresh: false,
    fileList: [
        "RP_339179_DDL_fagp_1628772928428.xml",
        "RP_339179_DDL_fpri_1628772928717.xml",
        "RP_339179_DDL_frloc_1628772929005.xml",
        "RP_339179_DDL_fsts_1628772929293.xml",
        "RP_339179_DDL_fprjt_1628772929580.xml",
        "RP_339179_DDL_MMPRJT_1628772929866.xml",
        "RP_339179_DDL_MMSTS_1628772930155.xml",
        "RP_339179_DDL_MMPRI_1628772930444.xml",
        "RP_339179_W.PROJ.LST_BROWSE_1628772937039.xml",
        "RP_339179_DDL_fsgrp_1628772937382.xml",
        "RP_339179_DDL_MDSGRP_1628772937668.xml",
        "RP_339179_W.USER.LST_BACK_1628772940457.xml",
        "RP_339179_W.PROJ.LST_SELECT_1628772947853.xml",
        "RP_339179_GETBOX_1628772948212.xml",
        "RP_339179_DDL_MDAGP_1628772948520.xml",
        "RP_339179_DDL_MDROLE_1628772948810.xml",
        "RP_339179_DDL_LOGSTS_1628772949102.xml",
        "RP_339179_W.PROJ.DET_BACK_1628772952106.xml",
        "RP_339179_DDL_FCFLDP_1628772952522.xml",
        "RP_339179_W.PROJ.LST_BROWSE_1628772956064.xml",
        "RP_339179_DDL_frsts_1628772956481.xml",
        "RP_339179_DDL_ftsts_1628772956767.xml",
        "RP_339179_DDL_MDLVL_1628772957059.xml",
        "RP_339179_DDL_frfpt_1628772957347.xml",
        "RP_339179_DDL_RLRLOC_1628772957639.xml",
        "RP_339179_DDL_MHINTS_1628772957924.xml",
        "RP_339179_W.RFP.LST_BACK_1628772963613.xml",
        "RP_339179_DDL_FCFLDP_1628772964017.xml",
        "RP_339179_W.PROJ.LST_BROWSE_1628772966610.xml",
        "RP_339179_W.GRP.LST_BACK_1628772968961.xml",
        "RP_339179_DDL_FCFLDP_1628772969357.xml",
        "RP_339179_W.PROJ.LST_BROWSE_1628772971209.xml",
        "RP_339179_W.GRP.LST_BROWSE_1628772974452.xml",
        "RP_339179_W.GRPT.LST_BACK_1628772976437.xml",
        "RP_339179_W.GRP.LST_BACK_1628772977797.xml",
        "RP_339179_W.USER.LST_BACK_1628772979542.xml",
        "RP_339179_DDL_FCFLDP_1628772979950.xml",
        "RP_339179_W.PROJ.LST__1628772927674.xml",
        "RP_339179_DDL_FCFLDP_1628772940870.xml",
        "RP_339179_DDL_FCFLDP_1628772928130.xml",
        "RP_398456_W.PROJ.LST_POSITION_1630324152208.xml",
        "RP_398456_W.PROJ.LST_POSITION_1630324152208 2.xml",
        "RP_398456_DDL_FCFLDP_1630324152703.xml",
        "RP_398456_DDL_FCFLDP_1630324152703 2.xml",
        "RP_398456_DDL_fagp_1630326131046.xml",
        "RP_398456_DDL_fpri_1630326131335.xml",
        "RP_398456_DDL_frloc_1630326131643.xml",
        "RP_398456_DDL_fsts_1630326131924.xml",
        "RP_398456_DDL_fprjt_1630326132207.xml",
        "RP_398456_W.PROJ.LST_POSITION_1630326132923.xml",
        "RP_398456_W.PROJ.LST_POSITION_1630326133441.xml",
        "RP_398456_DDL_FCFLDP_1630326133716.xml",
        "RP_398456_DDL_MMPRJT_1630326134019.xml",
        "RP_398456_DDL_FCFLDP_1630326134294.xml",
        "RP_398456_DDL_MMSTS_1630326134570.xml",
        "RP_398456_DDL_MMPRI_1630326134857.xml",
        "RP_398456_W.PROJ.LST_TASKLST_1630326821286.xml",
        "RP_398456_DDL_FCFLDT_1630326821835.xml",
        "RP_398456_DDL_freft_1630326822217.xml",
        "RP_398456_DDL_ftsks_1630326822526.xml",
        "RP_398456_DDL_ftskt_1630326822860.xml",
        "RP_398456_DDL_MDPRI_1630326823166.xml",
        "RP_398456_DDL_MDTSKT_1630326823485.xml",
        "RP_398456_DDL_MDTSKS_1630326823771.xml",
        "RP_339179_W.USER.LST_BROWSE_1628772972842.xml",
        "RP_398734_W.PROJ.LST__1630392260132.xml",
        "RP_398734_DDL_FCFLDP_1630392260635.xml",
        "RP_398734_DDL_fagp_1630392261067.xml",
        "RP_398734_DDL_fpri_1630392261446.xml",
        "RP_398734_DDL_frloc_1630392261803.xml",
        "RP_398734_DDL_fsts_1630392262168.xml",
        "RP_398734_DDL_fprjt_1630392262555.xml",
        "RP_398734_DDL_MMPRJT_1630392262921.xml",
        "RP_398734_DDL_MMSTS_1630392263278.xml",
        "RP_398734_DDL_MMPRI_1630392263652.xml",
        "RP_398734_DDL_FCFLDP_1630392298821.xml",
        "RP_398734_W.PROJ.LST_SELECT_1630392451013.xml",
        "RP_398734_GETBOX_1630392451647.xml",
        "RP_398734_DDL_MDAGP_1630392452157.xml",
        "RP_398734_DDL_MDROLE_1630392452526.xml",
        "RP_398734_DDL_LOGSTS_1630392452896.xml",
        "RP_398735_W.PROJ.LST__1630392531746.xml",
        "RP_398735_DDL_FCFLDP_1630392532248.xml",
        "RP_398735_DDL_fagp_1630392532594.xml",
        "RP_398735_DDL_fpri_1630392532959.xml",
        "RP_398735_DDL_frloc_1630392533319.xml",
        "RP_398735_DDL_fsts_1630392533661.xml",
        "RP_398735_DDL_fprjt_1630392534014.xml",
        "RP_398735_DDL_MMPRJT_1630392534357.xml",
        "RP_398735_DDL_MMSTS_1630392534734.xml",
        "RP_398735_DDL_MMPRI_1630392535088.xml",
        "RP_398735_W.PROJ.LST_SELECT_1630392547763.xml",
        "RP_398735_GETBOX_1630392548173.xml",
        "RP_398735_DDL_MDAGP_1630392548539.xml",
        "RP_398735_DDL_MDROLE_1630392548880.xml",
        "RP_398735_DDL_LOGSTS_1630392549257.xml",
        "RP_398885_W.PROJ.LST__1630392563025.xml",
        "RP_399714_W.PROJ.LST__1630496912896.xml",
        "RP_399714_DDL_FCFLDP_1630496913420.xml",
        "RP_399714_DDL_fagp_1630496913808.xml",
        "RP_399714_DDL_fpri_1630496914122.xml",
        "RP_399714_DDL_frloc_1630496914436.xml",
        "RP_399714_DDL_fsts_1630496914742.xml",
        "RP_399714_DDL_fprjt_1630496915065.xml",
        "RP_399714_DDL_MMPRJT_1630496915409.xml",
        "RP_399714_DDL_MMSTS_1630496915738.xml",
        "RP_399714_DDL_MMPRI_1630496916051.xml",
        "RP_435072_W.PROJ.LST__1631622876626.xml",
        "RP_435072_DDL_FCFLDP_1631622877260.xml",
        "RP_435072_DDL_fagp_1631622877678.xml",
        "RP_435072_DDL_fpri_1631622877970.xml",
        "RP_435072_DDL_frloc_1631622878248.xml",
        "RP_435072_DDL_fsts_1631622878526.xml",
        "RP_435072_DDL_fprjt_1631622878827.xml",
        "RP_435072_DDL_MMPRJT_1631622879111.xml",
        "RP_435072_DDL_MMSTS_1631622879408.xml",
        "RP_435072_DDL_MMPRI_1631622879685.xml",
        "RP_435072_W.PROJ.LST_BROWSE_1631623494715.xml",
        "RP_1631623495145.xml",
        "RP_1631623495451.xml",
        "RP_435072_W.USER.LST_SEARCH_1631623506233.xml",
        "RP_435072_W.USER.LST_SEARCH_1631623511107.xml",
        "RP_435072_W.USER.LST_BACK_1631623520745.xml",
        "RP_435072_DDL_FCFLDP_1631623521133.xml",
        "RP_435072_W.PROJ.LST_CALENDAR_1631623528126.xml",
        "RP_435072_DDL_frsts_1631623528513.xml",
        "RP_435072_DDL_MDLVL_1631623528797.xml",
        "RP_435072_DDL_frfpt_1631623529091.xml",
        "RP_435072_W.CAL.LST_HOME_1631623542292.xml",
        "RP_435072_DDL_FCFLDP_1631623542702.xml",
        "RP_435072_W.PROJ.LST_CALENDAR_1631623546849.xml",
        "RP_435072_W.CAL.LST_TASKLST_1631623558754.xml",
        "RP_435072_DDL_FCFLDT_1631623559186.xml",
        "RP_435072_DDL_freft_1631623559543.xml",
        "RP_435072_DDL_ftsks_1631623559861.xml",
        "RP_435072_DDL_ftskt_1631623560163.xml",
        "RP_435072_DDL_MDPRI_1631623560462.xml",
        "RP_435072_DDL_MDTSKT_1631623560763.xml",
        "RP_435072_DDL_MDTSKS_1631623561054.xml"
    ]
    // serverBusy: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                user: action.payload,
            };
        }
        case "SET_REQ_ACTION": {
            return {
                ...state,
                reqAction: action.payload,
            };
        }
        case "SET_REQ_FUNC": {
            return {
                ...state,
                reqFunction: action.payload,
            };
        }
        case "SET_REQ_LANGID": {
            return {
                ...state,
                reqLangId: action.payload,
            };
        }
        case "SET_REQ_REQUEST_CODE": {
            return {
                ...state,
                reqRequestCode: action.payload,
            };
        }
        case "SET_REQ_SCREEN": {
            return {
                ...state,
                reqScreen: action.payload,
            };
        }
        case "SET_REQ_THREAD": {
            return {
                ...state,
                reqThread: action.payload,
            };
        }
        case "SET_DDL_DATA": {
            return {
                ...state,
                ddlData: action.payload
            };
        }
        case "READ_SERVER_RESP":
            return {
                ...state,
                serverResp: action.payload,
            };
        case "SET_PAGE_RESP":
            return {
                ...state,
                pageResp: action.payload,
            };
        case "SET_BASE_TEMPLATE":
            return {
                ...state,
                baseTemplates: action.payload,
            };
        case "UPDATE_ACTION":
            return {
                ...state,
                action: action.payload,
            };
        case "UPDATE_FUNCTION":
            return {
                ...state,
                function: action.payload,
            };
        case "UPDATE_LANGID":
            return {
                ...state,
                langid: action.payload,
            };
        case "UPDATE_REQUEST_CODE":
            return {
                ...state,
                requestCode: action.payload,
            };
        case "UPDATE_SCREEN":
            return {
                ...state,
                screen: action.payload,
            };
        // case "UPDATE_DIALOG_SCREEN":
        //     return {
        //         ...state,
        //         dialogScreen: action.payload,
        //     };
        case "UPDATE_THREAD":
            return {
                ...state,
                thread: action.payload,
            };
        case "UPDATE_FRAME_LOAD":
            return {
                ...state,
                frameLoad: action.payload,
            };
        case "DFD_DATA":
            return {
                ...state,
                dfdData: action.payload,
            };
        case "SET_AWAIT_RESPONSE":
            return {
                ...state,
                awaitResponse: action.payload,
            };
        case "SET_STARTUP_CONFIGS":
            return {
                ...state,
                startupConfigs: action.payload,
            };
        case "SET_MDINSTANCE":
            return {
                ...state,
                mdinstance: action.payload,
            };
        case "SET_APP_REFRESH":
            return {
                ...state,
                appRefresh: action.payload,
            };
        // case "SET_DIALOG_BOX_RESP":
        //     return {
        //         ...state,
        //         dialogBoxResp: action.payload,
        //     };
        case "SET_XML_RESP_FILE_LIST":
            return {
                ...state,
                fileList: action.payload,
            };
        case 'RESET':
            return INITIAL_STATE; //Always return the initial state
        default:
            return state;
    }
};
