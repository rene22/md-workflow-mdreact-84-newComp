const INITIAL_STATE = {
    topbarData: null,
    titleInfo: {
        id: "TITLE",
        value: "MIDRANGE DYNAMICS"
    },
    subTitleInfo: {
        id: "SUBTITLE",
        value: "providing innovative IBM i solutions"
    },
    DFDinfo: {
        id: "DFD",
        src: "/getdfd",
    },
    // notificationInfo: {
    //     id: "NOTIFICATION",
    //     type: "notification",
    //     value: [{
    //         "title": "Notification",
    //         "content": "Place holder for notifications from the server."
    //     }]
    // },
    accountInfo: {
        id: "ACCOUNTINFO",
        type: "account",
        value: [
            // {
            //     "title": "Profile Info",
            //     "content": {
            //         "Name": "MD Admin",
            //         "email": "mdadmin@gmail.com",
            //         "contact": "91-9876543210"
            //     }
            // },
            {
                "title": "Session Info"
            }, {
                "title": "Logoff"
            }]
    },
    contactInfo: {
        header: "Contact",
        content: {
            title: "Contact Midrange Dynamics for Assistance",
            url: "https://support.mdcms.ch/login.jsp",
            details: ""
        }
        // content: "Contact Midrange Dynamics for Assistance\n\nhttps://support.mdcms.ch/login.jsp\n\n",
    },
    version: undefined
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOPBAR_DATA':
            return {
                ...state,
                topbarData: action.payload
            }
        case 'SET_TOPBAR_TITLE_INFO':
            return {
                ...state,
                titleInfo: action.payload
            }
        case 'SET_TOPBAR_SUBTITLE_INFO':
            return {
                ...state,
                subTitleInfo: action.payload
            }
        case 'SET_TOPBAR_NOTIFICATION_INFO':
            return {
                ...state,
                notificationInfo: action.payload
            }
        case 'SET_TOPBAR_ACCOUNT_INFO':
            return {
                ...state,
                accountInfo: action.payload
            }
        case 'SET_TOPBAR_CONTACT_INFO':
            return {
                ...state,
                contactInfo: action.payload
            }
        case 'SET_BUILD_VERSION':
            return {
                ...state,
                version: action.payload
            }
        case 'RESET':
            return INITIAL_STATE; //Always return the initial state
        default:
            return state;
    }
}