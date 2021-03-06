/* This implements styles related to specific components */
import {
    drawerWidth,
    theme
} from '../theme/theme';

const styles = (theme) => ({
    root: {
        display: 'flex',
        margin: theme.spacing(1),
    },
    drawerContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1),
    },
    mainContent: {
        width: '100vw',
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    caption: {
        fontSize: '1.5rem',
        fontWeight: '600'
    },
    hiddenField: {
        display: 'none',
        width: '0%'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    toolbar: {
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        ...theme.mixins.toolbar,
    },
    logoBox: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    titleBox: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    profileBox: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center'
    },
    topbarBoxCenter: {
        flexGrow: '1'
    },
    sidebarMenu: {
        paddingLeft: '5px'
    },
    drawerHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        paddingLeft:'10px'
    },
    hide: {
        display: 'none',
    },
    buttonGroupBtn: {
        margin: '5px'
    },
    sidebarFlexBox: {
        flexGrow: '1'
    },
    tableCardContent : {
        padding: '12px 0px 12px 0px',
    },
    contactCardHeader: {
        padding: '10px'
    },
    contactCardContent: {
        padding: '10px',
        whiteSpace : 'pre-wrap'
    },
    contactCard : {
        whiteSpace : 'pre-wrap',
    },
    emptyTable : {
        textAlign: 'center'
    },
    linkAlign : {
        justifyContent: 'left',
        paddingTop: '10px'
    },
    contactBtn : {
        color: '#fff'
    },
    hiddenGrid: {
        maxHeight: '0px'
    },
    updTabGridItem: {
        paddingRight: '22px',
    },
    updTabGridParent: {
        backgroundColor: "#fff"
    },
    sidebarCollapseIcon: {
        color: 'white'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute'
    },
    checkBoxCellBody: {
        textAlign : 'center',
        margin : '0px',
        width : '50px'
    },
    checkBoxCellHead: {
        textAlign : 'center',
        margin : '0px',
        width : '50px'
    },
    switchButton: {
        marginLeft: '-8px',
        cursor: 'default',
    },
    headVAlign: {
        verticalAlign: 'bottom'
    },
    drawerOpenButton: {
        paddingLeft: '18px'
    },
    cardComponent: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    RW7001RootGrid: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    RW7005RootGrid: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    RW7006RootGrid: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    RW7003RootGrid: {
        backgroundColor: '#def3ff',
        // width: 'max-content'
    },
    RW7001Error: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    RW7003ActionCompError: {
        backgroundColor: '#def3ff'
    },
    disabledField: {
        backgroundColor: '#ebebeb'
    },
    updatableTableGridRow: {
        flexWrap: 'nowrap'
    },
    updatableTableCardContent: {
        overflow: 'auto'
    }
})

export default styles;
