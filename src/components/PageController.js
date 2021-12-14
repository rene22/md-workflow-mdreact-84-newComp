import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ScreenRenderer from './ScreenRenderer';
import { setItemValue, setMainContentNavList, setMainContentData, setDialogPopUp } from '../actions/MainContentActions';
import { establishSession, setSessionInfo, resetStore } from '../actions/SessionInfoActions';
import { reloadApplication, setAppRefresh, setUsername, prepareAndSendServerReq, fetchDdlList, fetchBaseTemplate, initialPageHandler, buttonClickEventHandler, getPrevRespParams, sendInitialPageRequest } from '../actions/ServerActions';
import { setTopbarData } from '../actions/TopbarActions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const mapStateToProps = (state) => {
    return {
        user: state.serverReducer.user,
        currentScreen: state.serverReducer.screen,
        // dialogScreen: state.serverReducer.dialogScreen,
        pageResp: state.serverReducer.pageResp,
        // dialogBoxResp: state.serverReducer.dialogBoxResp,
        baseTemplates: state.serverReducer.baseTemplates,
        navList: state.mainContentReducer.navList,
        sessionInfo: state.sessionInfoReducer.sessionInfo,
        ddlList: state.serverReducer.ddlList,
        startupConfigs: state.serverReducer.startupConfigs,
        appRefresh: state.serverReducer.appRefresh,
        dialogPopUp: state.mainContentReducer.dialogPopUp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reloadApplication: () => {
            dispatch(reloadApplication())
        },
        setDialogPopUp: (data) => {
            dispatch(setDialogPopUp(data))
        },
        setItemValue: (item, value, idx) => {
            dispatch(setItemValue(item, value, idx));
        },
        getPrevRespParams: async () => {
            return (await (dispatch(getPrevRespParams())))
        },
        setAppRefresh: (value) => {
            dispatch(setAppRefresh(value));
        },
        setUsername: (name) => {
            dispatch(setUsername(name))
        },
        setSessionInfo: (num) => {
            dispatch(setSessionInfo(num))
        },
        establishSessionAndSendInitialPageReq: (ddlList) => {
            /* Reset redux store */
            Promise.resolve(dispatch(resetStore()))
                .then(async () => {
                    /* Establish session with the server which sets a SessionId cookie */
                    Promise.resolve(dispatch(establishSession()))
                        .then(async () => {

                            /* Popilate DDL data */
                            await Promise.all(ddlList.map((ddlCode) => {
                                Promise.resolve(dispatch(fetchDdlList(ddlCode)))
                            }))

                            /* Send Home Page request with default values set in Redux state */
                            dispatch(sendInitialPageRequest())
                        })
                })
        },
        sendInitialPageReq: (jobNumber) => {
            /* Set Session info (JobNumber) using SessionId cookie in Redux store 
            before sending Initial Page request to server */
            Promise.resolve(dispatch(setSessionInfo(jobNumber)))
                .then(() => {
                    /* Send Home Page request with default values set in Redux state */
                    dispatch(sendInitialPageRequest())
                })
        },
        buttonClickEventHandler: (frameCtrl, reqParams) => {
            dispatch(buttonClickEventHandler(frameCtrl, reqParams))
        },
        fetchBaseTemplate: (screen) => {
            dispatch(fetchBaseTemplate(screen))
        },
        backToLoginHandler: (reqParams) => {
            Promise.resolve(dispatch(initialPageHandler(reqParams)))
                .then(() => {
                    /* Establish session with the server which sets a SessionId cookie */
                    Promise.resolve(dispatch(establishSession()))
                        .then(() => {
                            /* Send Home Page request with default values set in Redux state */
                            dispatch(prepareAndSendServerReq())
                        })
                })
        },
        navListHandler: (data, index) => {
            dispatch(setMainContentNavList(data, index))
        },
        resetMsgList: () => {
            dispatch({
                type: "SET_MAIN_CONTENT_MSG_LIST",
                payload: [],
            })
        },
        setTopbarData: () => {
            dispatch(setTopbarData())
        }
    }
}

function PageController(props) {
    /* To fill in the params to form req/resp accordingly */
    var reqParams = {};

    const { cookies } = props;

    /* Invoke startup action to read initial page response from server */
    useEffect(() => {
        document.addEventListener('keydown', eventHandler)
        window.pendingChanges = false
        window.addEventListener('popstate', function (e) {
            if (document.getElementById('BACK'))
                buttonClickHandler('BACK')
        });

        props.setTopbarData();

        if ((!cookies.get('SessionID') && props.currentScreen != 'LOGOFF') ||
            (!cookies.get('SessionID') && localStorage.getItem('state') === undefined)) {
            props.establishSessionAndSendInitialPageReq(props.ddlList);
        } else if (localStorage.getItem('state') === undefined && cookies.get('SessionID') != undefined) {
            props.sendInitialPageReq(cookies.get('SessionID').split('-')[1])
        }
    }, [])

    useEffect(() => {
        props.fetchBaseTemplate()
    }, [props.currentScreen])

    // useEffect(() => {
    //     props.fetchBaseTemplate(props.dialogScreen)
    // }, [props.dialogScreen])

    function eventHandler(event) {
        if (event.key === 'Enter' && window.buttonList && window.buttonList.length) {
            buttonClickHandler(JSON.parse(localStorage.getItem('state')).mainContentReducer.buttonList[0].id);
        }
    }

    /* Button click event handler to simulate page navigation */
    async function buttonClickHandler(id, pgNum, index) {
        var screen = index != undefined ? props.navList[index + 1].screen : undefined

        if (id === 'BACK')
            props.navListHandler(null, index);

        if (screen === undefined && props.currentScreen === undefined) {
            screen = JSON.parse(localStorage.getItem('state')).mainContentReducer.navList[index + 1].screen;
        }


        console.log('buttonClickHandler: ', id);

        if (id === 'Reload') {
            props.reloadApplication();
        } else {
            var params = Object.assign({}, await props.getPrevRespParams())

            if (!pgNum) {
                reqParams.action = params.action
                reqParams.function = params.function
                reqParams.langId = params.langid
                reqParams.requestCode = id
                reqParams.screen = screen ? screen : props.currentScreen ?
                    props.currentScreen : JSON.parse(localStorage.getItem('state')).serverReducer.screen
                reqParams.thread = params.thread

                props.buttonClickEventHandler(reqParams)
            }
            else {
                reqParams.action = id
                reqParams.function = '*PAGE'
                reqParams.langId = params.langid
                reqParams.requestCode = `${pgNum}`
                reqParams.screen = screen ? screen : props.currentScreen ?
                    props.currentScreen : JSON.parse(localStorage.getItem('state')).serverReducer.screen
                reqParams.thread = params.thread

                props.buttonClickEventHandler(reqParams, true)
            }
        }
    }

    /* Link click event handler to simulate page navigation */
    async function linkClickHandler(id) {
        var params = Object.assign({}, await props.getPrevRespParams())

        switch (id) {
            case 'LOGOFF':
                reqParams.action = props.action
                reqParams.function = '*THREADEND'
                reqParams.langId = params.langid
                reqParams.requestCode = ''
                reqParams.screen = ''
                reqParams.thread = params.thread

                props.buttonClickEventHandler(reqParams)
                break;

            case 'BACKTOLOGIN':
                // reqParams.action = ''
                // reqParams.function = 'W.LIC.SEL'
                // reqParams.langId = params.langid
                // reqParams.requestCode = ''
                // reqParams.screen = ''
                // reqParams.thread = ''

                props.establishSessionAndSendInitialPageReq(props.ddlList);
                break;

            default:
                reqParams.action = params.action
                reqParams.function = params.function
                reqParams.langId = params.langid
                reqParams.requestCode = id
                reqParams.screen = props.currentScreen ?
                    props.currentScreen : JSON.parse(localStorage.getItem('state')).serverReducer.screen
                reqParams.thread = params.thread

                props.buttonClickEventHandler(reqParams)
                break;
        }
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ScreenRenderer buttonClickHandler={buttonClickHandler} linkClickHandler={linkClickHandler} {...props} />
        </MuiPickersUtilsProvider>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PageController);