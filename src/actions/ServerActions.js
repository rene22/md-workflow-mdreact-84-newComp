import apis from '../apis/index';
import { setMainContentNavList, setDialogPopUp } from './MainContentActions';
import { resetStore, establishSession } from './SessionInfoActions';
import xml2js from 'xml2js';

function convertXMLToJSON(xmlData) {
    return new Promise(async (resolve, reject) => {

        xml2js.parseString(xmlData, {
            explicitArray: false,
            mergeAttrs: true
        }, function (err, result) {
            if (err)
                resolve(null)
            else
                resolve(result)
        })
    })
}

export const setStartupConfigs = (data) => async (dispatch) => {
    dispatch({
        type: "SET_STARTUP_CONFIGS",
        payload: data
    })
}

export const setUsername = (name) => async (dispatch, getState) => {
    dispatch({
        type: 'SET_USER',
        payload: name
    })
}

export const setAppRefresh = (value) => async (dispatch, getState) => {
    dispatch({
        type: 'SET_APP_REFRESH',
        payload: value
    })
}

function convertJSONtoXML(jsonData) {
    return new Promise((resolve, reject) => {
        var builder = new xml2js.Builder({ headless: true });
        var xmlReq = builder.buildObject(jsonData);

        resolve(xmlReq)
    })
}

// function readResponse(name) {
//     return new Promise((resolve, reject) => {
//         var xhttp = new XMLHttpRequest();

//         xhttp.open("GET", `../../MDCONNECT/res/${name}`, true);
//         xhttp.send();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState === 4 && this.status === 200) {
//                 resolve(this.responseText)
//             }
//         };
//     })
// }

export const getPrevRespParams = () => async (dispatch, getState) => {

    const state = getState();

    var respParams = {};

    respParams.action = state.serverReducer.action
    respParams.function = state.serverReducer.function
    respParams.langid = state.serverReducer.langid
    respParams.thread = state.serverReducer.thread

    return respParams;
}

export const sendServerReq = (req, startupConfigs) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

        const state = getState();

        // if (state.serverReducer.pendingChanges) {

        //     dispatch(setDialogPopUp({
        //         header: "Alert",
        //         content: {
        //             title: 'You have pending changes. Are you sure you want to leave the page ?'
        //         },
        //         action: [
        //             "Cancel",
        //             "Continue"
        //         ]
        //     }))


        // } else {
        var xmlReq = await convertJSONtoXML(req);

        // const url = startupData.apiPaths.MDPRCDTAQ;

        // const url = startupConfigs.apiPaths.MDPRCDTAQ;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };

        if (startupConfigs.debugMode.debugOn) console.log('Sending XML Request:\n', xmlReq);

        window.pendingChanges = false;

        // dispatch({
        //     type: 'SET_PENDING_CHANGES',
        //     payload: false
        // })

        dispatch({
            type: 'SET_AWAIT_RESPONSE',
            payload: true
        })

        dispatch({
            type: "SET_MAIN_CONTENT_MSG_LIST",
            payload: [],
        })

        if (getCookie('SessionID') === '') {

            if (getCookie('UserID') != '')
                setCookie('UserID', '', 0)

            reloadApplication();
        }
        else if (state.mainContentReducer.navList &&
            req.request.operation.container[0].field[4].$.value != 'RW7002' &&
            state.mainContentReducer.navList.findIndex((nav) => nav.id === 'Reseller Login') > 0 &&
            state.mainContentReducer.navList.findIndex((nav) => nav.id === 'Reseller Login') < state.mainContentReducer.navList.length
            && getCookie('UserID') === '') {

            if (getCookie('SessionID') != '')
                setCookie('SessionID', '', 0)

            Promise.resolve(dispatch(resetStore()))
                .then(() => {
                    /* Establish session with the server which sets a SessionId cookie */
                    Promise.resolve(dispatch(establishSession()))
                        .then(() => {
                            /* Send Home Page request with default values set in Redux state */
                            dispatch(prepareAndSendServerReq())

                            Promise.all(state.serverReducer.ddlList.map((ddlCode) => {
                                dispatch(fetchDdlList(ddlCode))
                            }))
                        })
                })
        }
        else {

            /*Testing*/
            // var mdinstance = undefined
            // console.log('Cond1:', state.serverReducer.mdinstance === null);

            // if (state.serverReducer.mdinstance === null) {
            //     console.log('window.location.pathname: ', window.location.pathname)

            //     mdinstance = window.location.pathname.split('/')[1]
            //     dispatch({
            //         type: 'SET_MDINSTANCE',
            //         payload: mdinstance
            //     })
            // }

            // var newUrl = undefined;

            // console.log('cond2:', startupConfigs.deploymentMode == "server")

            // if (startupConfigs.deploymentMode == "server") {
            //     console.log('Inside 1', window.location.origin, state.serverReducer.mdinstance != null ?
            //     state.serverReducer.mdinstance : mdinstance)

            //     newUrl = window.location.origin.concat('/' , state.serverReducer.mdinstance != null ?
            //         state.serverReducer.mdinstance : mdinstance, "/MDRDIAQ");

            //     console.log(newUrl)
            // }
            // else {
            //     console.log('Inside 2')

            //     newUrl = startupConfigs.apiPath + "/MDRDIAQ";

            //     console.log(newUrl)
            // }

            // console.log('URL: ', newUrl);
            // console.log('mdinstance: ', mdinstance);
            // console.log('cond: ', state.serverReducer.mdinstance != null ? state.serverReducer.mdinstance : mdinstance)
            // console.log('startupData', startupConfigs, startupConfigs.deploymentMode)
            /*Testing*/

            var resp = undefined;
            var url = startupConfigs.deploymentMode === 'server' ?
                '../../MDREP' + startupConfigs.sessionPayload.environment + '/' + startupConfigs.apiPaths.MDPRCDTAQ :
                startupConfigs.apiPath + 'MDREP' + startupConfigs.sessionPayload.environment + '/' + startupConfigs.apiPaths.MDPRCDTAQ;

            console.log('Sending post request');

            await apis.post(url, xmlReq, axiosConfig, { timeout: 15000 })
                .then(async (response) => {
                    resp = response;

                    if (resp && resp.status === 200) {

                        var jobData = resp.headers['x-mdrsrvjob'].split('-');

                        if (startupConfigs.debugMode.debugOn) console.log('Program name: ', jobData[0]);
                        if (startupConfigs.debugMode.debugOn) console.log('Library name: ', jobData[1]);
                        if (startupConfigs.debugMode.debugOn) console.log('Job name: ', jobData[2]);
                        if (startupConfigs.debugMode.debugOn) console.log('CGI Job number: ', jobData[3]);

                        dispatch({
                            type: 'SET_AWAIT_RESPONSE',
                            payload: false
                        })

                        if (startupConfigs.debugMode.debugOn) console.log('Received XML Response:\n', resp.data);

                        var jsonResp = await convertXMLToJSON(resp.data);

                        if (req.request.operation.container[0].field[1].$.value === 'GETDDLIST') {

                            if (startupConfigs.debugMode.debugOn) console.log('Received DDL response');

                            let ddlData = {}
                            ddlData[`${req.request.operation.container[0].field[3].$.value}`] = jsonResp.operation.container[1].array;

                            resolve(
                                dispatch({
                                    type: 'SET_DDL_DATA',
                                    payload: Object.assign(state.serverReducer.ddlData, ddlData)
                                })
                            )
                        }
                        else if (req.request.operation.container[0].field[1].$.value === '*THREADEND') {

                            if (startupConfigs.debugMode.debugOn) console.log('Received Logoff response');

                            dispatch({
                                type: `UPDATE_SCREEN`,
                                payload: 'LOGOFF',
                            })

                            dispatch({
                                type: 'SET_PAGE_RESP',
                                payload: jsonResp
                            })

                            dispatch({
                                type: 'SET_MAIN_CONTENT_BUTTON_LIST',
                                payload: [{
                                    "id": "BACKTOLOGIN",
                                    "value": "Back to User Login"
                                }]
                            })

                            dispatch({
                                type: 'SET_MAIN_CONTENT_MSG_LIST',
                                payload: [{
                                    "value": "You successfully logged out of MD License Tool. There is no other active thread.",
                                    "severity": "10",
                                }]
                            })

                            dispatch({
                                type: "SET_MAIN_CONTENT_CAPTION",
                                payload: '',
                            });

                            dispatch({
                                type: "SET_MAIN_CONTENT_FIELD_LIST",
                                payload: [],
                            });

                            dispatch({
                                type: "SET_MAIN_CONTENT_GRID_LIST",
                                payload: [],
                            });

                            // Deleting cookies
                            setCookie('SessionID', '', 0)
                            setCookie('UserID', '', 0)

                            resolve(dispatch(setMainContentNavList('LOGOFF')))
                        }
                        else {

                            resolve(
                                dispatch({
                                    type: 'SET_PAGE_RESP',
                                    payload: jsonResp
                                })
                            )
                        }
                    } else if (resp && resp.status === 203) {
                        if (startupConfigs.debugMode.debugOn) console.log('Response error: ', resp.status);

                        dispatch({
                            type: 'SET_AWAIT_RESPONSE',
                            payload: false
                        })

                        dispatch(setDialogPopUp({
                            header: "Alert",
                            content: {
                                title: `Message: ${resp.status} ${resp.statusText} - Your IBM i session has expired`,
                                details: 'Recovery: Select Reload to logoff and login again.'
                            },
                            action: "Reload"
                        }))

                        resolve();
                    } else if (resp && resp.status === 503) {
                        if (startupConfigs.debugMode.debugOn) console.log('Response error: ', resp.status);

                        dispatch({
                            type: 'SET_AWAIT_RESPONSE',
                            payload: false
                        })

                        dispatch(setDialogPopUp({
                            header: "Alert",
                            content: {
                                title: `Message: ${resp.status} ${resp.statusText} - ${resp.request.responseURL}`,
                                details: 'Recovery: Please check the HTTP server instance is started and correctly configured'
                            },
                            action: "Reload"
                        }))

                        resolve();
                    } else if (resp && resp.status === 404) {
                        if (startupConfigs.debugMode.debugOn) console.log('Response error: ', resp.status);

                        dispatch({
                            type: 'SET_AWAIT_RESPONSE',
                            payload: false
                        })

                        dispatch(setDialogPopUp({
                            header: "Alert",
                            content: {
                                title: `Message: ${resp.status} ${resp.statusText} - ${resp.request.responseURL}`,
                                details: 'Recovery: Please fix the error in startup.json config file and reload the page'
                            },
                            action: "Dismiss"
                        }))

                        resolve();
                    } else {
                        if (startupConfigs.debugMode.debugOn) console.log('Response error: ', resp);

                        dispatch({
                            type: 'SET_AWAIT_RESPONSE',
                            payload: false
                        })

                        dispatch(setDialogPopUp({
                            header: "Alert",
                            content: {
                                title: `Message: Request time out/Service unavailable`,
                                details: 'Recovery: Select Reload to logoff and login again.'
                            },
                            action: "Reload"
                        }))

                        resolve()
                    }
                })
                .catch((err) => {
                    if (startupConfigs.debugMode.debugOn) console.log('Exception error: ', err)

                    dispatch({
                        type: 'SET_AWAIT_RESPONSE',
                        payload: false
                    })

                    dispatch(setDialogPopUp({
                        header: "Connection Error",
                        content: {
                            title: `Message: ${err.response.status} ${err.response.statusText} - ${err.response.request.responseURL}`,
                            details: 'Recovery: Please check the Server status or correct the error in startup.json config file and reload the page'
                        },
                        action: "Dismiss"
                    }))

                    resolve()
                })
        }
        // }
    })
}

export const prepareAndSendServerReq = () => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

        const state = getState();
        var reqObj = {}
        var screenObj = undefined;

        var startupConfigs = state.serverReducer.startupConfigs ?
            state.serverReducer.startupConfigs : undefined;

        if (startupConfigs === undefined) {
            fetch("./startup.json")
                .then(response => response.json())
                .then(async (startupConfigs) => {

                    dispatch({
                        type: "SET_STARTUP_CONFIGS",
                        payload: startupConfigs
                    })

                    /* Compose server request (JSON) */
                    reqObj['request'] = {
                        'dataqID': 'MD' + state.sessionInfoReducer.sessionInfo.jobNumber + 'CQ',
                        'lib': 'MDREP' + startupConfigs.sessionPayload.environment,
                        'logoff': state.serverReducer.reqFunction === '*THREADEND' ? 'true' : 'false',
                        'maxwait': startupConfigs.maxwait,
                        'userid': '',
                        'operation': { 'container': [] }
                    }

                    reqObj.request.operation.container.push({
                        '$': {
                            type: 'GLOBAL'
                        },
                        'field': [
                            {
                                '$': {
                                    id: 'ACTION',
                                    value: state.serverReducer.reqAction
                                }
                            },
                            {
                                '$': {
                                    id: 'FUNCTION',
                                    value: state.serverReducer.reqFunction
                                }
                            },
                            {
                                '$': {
                                    id: 'LANGID',
                                    value: state.serverReducer.reqLangId
                                }
                            },
                            {
                                '$': {
                                    id: 'REQUESTCODE',
                                    value: state.serverReducer.reqRequestCode
                                }
                            },
                            {
                                '$': {
                                    id: 'SCREEN',
                                    value: state.serverReducer.reqScreen
                                }
                            },
                            {
                                '$': {
                                    id: 'THREAD',
                                    value: state.serverReducer.reqThread
                                }
                            }
                        ]
                    })

                    if (state.serverReducer.reqFunction != '*PAGE' && state.serverReducer.reqFunction != 'GETDDLIST' && state.serverReducer.reqFunction != '*THREADEND' && state.serverReducer.reqScreen != "") {
                        // if (state.mainContentReducer.fieldList.length) {
                        screenObj = {
                            '$': {
                                type: 'SCREEN'
                            }
                        }

                        screenObj['caption'] = { '$': { value: state.mainContentReducer.caption } }

                        /* Populating field(s) info */
                        switch (true) {
                            case state.mainContentReducer.fieldList.length === 1:
                                if ((state.mainContentReducer.fieldList[0].editable && state.mainContentReducer.fieldList[0].editable === 'true') ||
                                    (state.mainContentReducer.fieldList[0].visible && state.mainContentReducer.fieldList[0].visible === 'false')) {
                                    screenObj['field'] = { '$': {} }

                                    Object.keys(state.mainContentReducer.fieldList[0]).forEach((key) => {
                                        if (key === 'value' && document.getElementById(state.mainContentReducer.fieldList[0].id)) {

                                            if (state.serverReducer.ddlList.indexOf(state.mainContentReducer.fieldList[0].id) >= 0)
                                                screenObj['field']['$'][key] = document.getElementById(state.mainContentReducer.fieldList[0].id).nextSibling.value
                                            else {
                                                if (document.getElementById(state.mainContentReducer.fieldList[0].id).getAttribute('isDate')) {
                                                    var date = document.getElementById(state.mainContentReducer.fieldList[0].id).value.replace(/\//g, '');
                                                    screenObj['field']['$'][key] = date.substr(4, 4) + date.substr(2, 2) + date.substr(0, 2)
                                                }
                                                else
                                                    screenObj['field']['$'][key] = document.getElementById(state.mainContentReducer.fieldList[0].id).value;
                                            }

                                        } else {
                                            if (key != 'error')
                                                screenObj['field']['$'][key] = state.mainContentReducer.fieldList[0][key]
                                        }

                                        if (document.getElementById(state.mainContentReducer.fieldList[0].id) &&
                                            document.getElementById(state.mainContentReducer.fieldList[0].id).getAttribute('focussed') &&
                                            document.getElementById(state.mainContentReducer.fieldList[0].id).getAttribute('focussed') === 'true') {

                                            /* set the focus attribute in server response object */
                                            screenObj['field']['$']['focus'] = 'true';

                                            /* unset the focussed attribute in document element after populating server response */
                                            document.getElementById(state.mainContentReducer.fieldList[0].id).setAttribute('focussed', 'false');
                                        }
                                    })

                                    // screenObj['field']['$']['browse'] = false
                                }

                                break;

                            case state.mainContentReducer.fieldList.length > 1:
                                screenObj['field'] = []

                                state.mainContentReducer.fieldList.forEach((field) => {
                                    if ((field.editable && field.editable === 'true') ||
                                        (field.visible && field.visible === 'false')) {
                                        var obj = { '$': {} }

                                        Object.keys(field).forEach((key) => {

                                            if (key === 'value' && document.getElementById(field.id)) {

                                                if (state.serverReducer.ddlList.indexOf(field.id) >= 0)
                                                    obj['$'][key] = document.getElementById(field.id).nextSibling.value
                                                else {
                                                    if (document.getElementById(field.id).getAttribute('isDate')) {
                                                        var date = document.getElementById(field.id).value.replace(/\//g, '');
                                                        obj['$'][key] = date.substr(4, 4) + date.substr(2, 2) + date.substr(0, 2)
                                                    }
                                                    else
                                                        obj['$'][key] = document.getElementById(field.id).value
                                                }

                                            } else {
                                                if (key != 'error')
                                                    obj['$'][key] = field[key]
                                            }

                                            if (document.getElementById(field.id) &&
                                                document.getElementById(field.id).getAttribute('focussed') &&
                                                document.getElementById(field.id).getAttribute('focussed') === 'true') {

                                                /* set the focus attribute in server response object */
                                                obj['$']['focus'] = 'true';

                                                /* unset the focussed attribute in document element after populating server response */
                                                document.getElementById(field.id).setAttribute('focussed', 'false');
                                            }
                                            // obj['$']['browse'] = false;

                                        })
                                        screenObj['field'].push(obj);
                                    }
                                })


                                break;

                            default:
                                if (startupConfigs.debugMode.debugOn) console.log('hit default in composing xml req')
                        }

                        /* Populating grid(s) info */
                        switch (true) {
                            case state.mainContentReducer.gridList.length === 1:

                                /* compose grid tag when there is only one grid in the list */
                                screenObj['grid'] = {
                                    '$': {
                                        'id': state.mainContentReducer.gridList[0].id
                                    }
                                }

                                screenObj['grid']['rows'] = {}

                                if (Array.isArray(state.mainContentReducer.gridList[0].rows.row)) {
                                    /* When there are more than one row in the grid data */
                                    screenObj['grid']['rows']['row'] = []

                                    state.mainContentReducer.gridList[0].rows.row.forEach((row, idx) => {
                                        var rowObj = {
                                            '$': {
                                                'nr': row.nr
                                            },
                                            'item': []
                                        }

                                        row.item.forEach((col) => {
                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')'))

                                                if ((col['visible'] && col['visible'] === 'false') ||
                                                    (col['editable'] && col['editable'] === 'true') ||
                                                    (document.getElementById(col.id + '(' + (idx + 1) + ')') && document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true')) {

                                                    var colObj = { '$': {} }

                                                    console.log("Inside 1", row.item);

                                                    for (var key in col) {
                                                        if (key === 'value' && document.getElementById(col.id + '(' + (idx + 1) + ')')) {

                                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')').value.trim() != '' &&
                                                                document.getElementById(col.id + '(' + (idx + 1) + ')').value != 'false')

                                                                colObj['$'][key] = document.getElementById(col.id + '(' + (idx + 1) + ')').value

                                                            /* Unset the checkbox */
                                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')').value === 'true') {
                                                                document.getElementById(col.id + '(' + (idx + 1) + ')').flagged = 'true';
                                                            }
                                                        }
                                                        else
                                                            colObj['$'][key] = col[key]
                                                    }

                                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')') &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true') {
                                                        /* set the focus attribute in server response object */
                                                        colObj['$']['focus'] = 'true'

                                                        /* unset the focussed attribute in document element after populating server response */
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').setAttribute('focussed', 'false');
                                                    }

                                                    rowObj.item.push(colObj);
                                                }
                                        })
                                        screenObj['grid']['rows']['row'].push(rowObj)
                                    })

                                } else if (state.mainContentReducer.gridList[0].rows.row) {
                                    /* When there is just one row in the grid data */
                                    screenObj['grid']['rows']['row'] = {
                                        '$': {
                                            'nr': state.mainContentReducer.gridList[0].rows.row.nr
                                        },
                                        'item': []
                                    }

                                    state.mainContentReducer.gridList[0].rows.row.item.forEach((col) => {
                                        if ((col['visible'] && col['visible'] === 'false') ||
                                            (col['editable'] && col['editable'] === 'true') ||
                                            (document.getElementById(col.id + '(1)') && document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                                document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true')) {

                                            var colObj = { '$': {} }

                                            for (var key in col) {
                                                if (key === 'value' && document.getElementById(col.id + '(1)')) {

                                                    if (document.getElementById(col.id + '(1)').value.trim() != '' &&
                                                        document.getElementById(col.id + '(1)').value != 'false')

                                                        colObj['$'][key] = document.getElementById(col.id + '(1)').value

                                                    /* Unset the checkbox */
                                                    if (document.getElementById(col.id + '(1)').value === 'true') {
                                                        document.getElementById(col.id + '(1)').flagged = 'true';
                                                    }
                                                }
                                                else
                                                    colObj['$'][key] = col[key]
                                            }

                                            if (document.getElementById(col.id + '(1)') &&
                                                document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                                document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true') {

                                                /* set the focus attribute in server response object */
                                                colObj['$']['focus'] = 'true'

                                                /* unset the focussed attribute in document element after populating server response */
                                                document.getElementById(col.id + '(1)').setAttribute('focussed', 'false');
                                            }

                                            screenObj['grid']['rows']['row']['item'].push(colObj);
                                        }
                                    })
                                }

                                break;

                            case state.mainContentReducer.gridList.length > 1:

                                /* compose grid tag when there is more than one grid */
                                screenObj['grid'] = []

                                state.mainContentReducer.gridList.forEach((grid) => {
                                    var gridObj = {
                                        '$': {
                                            'id': grid.id
                                        },
                                        'rows': {}
                                    }

                                    if (Array.isArray(grid.rows.row)) {
                                        /* When there are more than one row in the grid data */
                                        gridObj['rows']['row'] = []

                                        grid.rows.row.forEach((row, idx) => {
                                            var rowObj = {
                                                '$': {
                                                    'nr': row.nr
                                                },
                                                'item': []
                                            }

                                            row.item.forEach((col) => {
                                                if ((col['visible'] && col['visible'] === 'false') ||
                                                    (col['editable'] && col['editable'] === 'true') ||
                                                    (document.getElementById(col.id + '(' + (idx + 1) + ')') && document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true')) {

                                                    var colObj = { '$': {} }
                                                    console.log("Inside 2", row.item);
                                                    for (var key in col) {
                                                        if (key === 'value' && document.getElementById(col.id + '(' + (idx + 1) + ')')) {

                                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')').value.trim() != '' &&
                                                                document.getElementById(col.id + '(' + (idx + 1) + ')').value != 'false')

                                                                colObj['$'][key] = document.getElementById(col.id + '(' + (idx + 1) + ')').value

                                                            /* Unset the checkbox */
                                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')').value === 'true') {
                                                                document.getElementById(col.id + '(' + (idx + 1) + ')').flagged = 'true';
                                                            }
                                                        }
                                                        else
                                                            colObj['$'][key] = col[key]
                                                    }

                                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')') &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true') {

                                                        /* set the focus attribute in server response object */
                                                        colObj['$']['focus'] = 'true'

                                                        /* unset the focussed attribute in document element after populating server response */
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').setAttribute('focussed', 'false');
                                                    }

                                                    rowObj.item.push(colObj);
                                                }
                                            })

                                            gridObj['rows']['row'].push(rowObj)
                                        })

                                        screenObj['grid'].push(gridObj);
                                    } else if (grid.rows.row) {
                                        /* When there is just one row in the grid data */
                                        gridObj['rows']['row'] = {
                                            '$': {
                                                'nr': grid.rows.row.nr
                                            },
                                            'item': []
                                        }

                                        grid.rows.row.item.forEach((col) => {
                                            if ((col['visible'] && col['visible'] === 'false') ||
                                                (col['editable'] && col['editable'] === 'true') ||
                                                (document.getElementById(col.id + '(1)') && document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                                    document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true')) {

                                                var colObj = { '$': {} }

                                                for (var key in col) {
                                                    if (key === 'value' && document.getElementById(col.id + '(1)')) {

                                                        if (document.getElementById(col.id + '(1)').value.trim() != '' &&
                                                            document.getElementById(col.id + '(1)').value != 'false')

                                                            colObj['$'][key] = document.getElementById(col.id + '(1)').value

                                                        /* Unset the checkbox */
                                                        if (document.getElementById(col.id + '(1)').value === 'true') {
                                                            document.getElementById(col.id + '(1)').flagged = 'true';
                                                        }
                                                    }
                                                    else
                                                        colObj['$'][key] = col[key]
                                                }

                                                if (document.getElementById(col.id + '(1)') &&
                                                    document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                                    document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true') {

                                                    /* set the focus attribute in server response object */
                                                    colObj['$']['focus'] = 'true'

                                                    /* unset the focussed attribute in document element after populating server response */
                                                    document.getElementById(col.id + '(1)').setAttribute('focussed', 'false');
                                                }

                                                gridObj['rows']['row']['item'].push(colObj);
                                            }
                                        })
                                        screenObj['grid'].push(gridObj);
                                    }
                                })

                                break;

                            default:
                                if (startupConfigs.debugMode.debugOn) console.log('hit default in composing xml req')
                        }

                        reqObj.request.operation.container.push(screenObj)
                        // }
                    }

                    if (state.serverReducer.reqScreen === 'RW7002') {
                        var user = reqObj.request.operation.container[1].field.find((fld) => fld['$'].id === 'USRID')
                        reqObj.request.userid = user['$']['value'];
                    }

                    resolve(dispatch(sendServerReq(reqObj, startupConfigs)))
                })
        } else {
            /* Compose server request (JSON) */
            reqObj['request'] = {
                'dataqID': 'MD' + state.sessionInfoReducer.sessionInfo.jobNumber + 'CQ',
                'lib': 'MDREP' + startupConfigs.sessionPayload.environment,
                'logoff': state.serverReducer.reqFunction === '*THREADEND' ? 'true' : 'false',
                'maxwait': startupConfigs.maxwait,
                'userid': '',
                'operation': { 'container': [] }
            }

            reqObj.request.operation.container.push({
                '$': {
                    type: 'GLOBAL'
                },
                'field': [
                    {
                        '$': {
                            id: 'ACTION',
                            value: state.serverReducer.reqAction
                        }
                    },
                    {
                        '$': {
                            id: 'FUNCTION',
                            value: state.serverReducer.reqFunction
                        }
                    },
                    {
                        '$': {
                            id: 'LANGID',
                            value: state.serverReducer.reqLangId
                        }
                    },
                    {
                        '$': {
                            id: 'REQUESTCODE',
                            value: state.serverReducer.reqRequestCode
                        }
                    },
                    {
                        '$': {
                            id: 'SCREEN',
                            value: state.serverReducer.reqScreen
                        }
                    },
                    {
                        '$': {
                            id: 'THREAD',
                            value: state.serverReducer.reqThread
                        }
                    }
                ]
            })

            console.log('Going to fetch data !');

            if (state.serverReducer.reqFunction != 'GETDDLIST' && state.serverReducer.reqFunction != '*THREADEND' && state.serverReducer.reqScreen != "") {
                // if (state.mainContentReducer.fieldList.length) {
                screenObj = {
                    '$': {
                        type: 'SCREEN'
                    }
                }

                screenObj['caption'] = { '$': { value: state.mainContentReducer.caption } }
                console.log('Inside data population !');

                /* Populating field(s) info */
                switch (true) {
                    case state.mainContentReducer.fieldList.length === 1:
                        if ((state.mainContentReducer.fieldList[0].editable && state.mainContentReducer.fieldList[0].editable === 'true') ||
                            (state.mainContentReducer.fieldList[0].visible && state.mainContentReducer.fieldList[0].visible === 'false')) {
                            screenObj['field'] = { '$': {} }

                            Object.keys(state.mainContentReducer.fieldList[0]).forEach((key) => {
                                if (key === 'value' && document.getElementById(state.mainContentReducer.fieldList[0].id)) {
                                    if (state.serverReducer.ddlList.indexOf(state.mainContentReducer.fieldList[0].id) >= 0)
                                        screenObj['field']['$'][key] = document.getElementById(state.mainContentReducer.fieldList[0].id).nextSibling.value
                                    else {
                                        if (document.getElementById(state.mainContentReducer.fieldList[0].id).getAttribute('isDate')) {
                                            var date = document.getElementById(state.mainContentReducer.fieldList[0].id).value.replace(/\//g, '');
                                            screenObj['field']['$'][key] = date.substr(4, 4) + date.substr(2, 2) + date.substr(0, 2)
                                        }
                                        else
                                            screenObj['field']['$'][key] = document.getElementById(state.mainContentReducer.fieldList[0].id).value;
                                    }
                                } else {
                                    if (key != 'error')
                                        screenObj['field']['$'][key] = state.mainContentReducer.fieldList[0][key]
                                }

                                if (document.getElementById(state.mainContentReducer.fieldList[0].id) &&
                                    document.getElementById(state.mainContentReducer.fieldList[0].id).getAttribute('focussed') &&
                                    document.getElementById(state.mainContentReducer.fieldList[0].id).getAttribute('focussed') === 'true') {

                                    /* set the focus attribute in server response object */
                                    screenObj['field']['$']['focus'] = 'true';

                                    /* unset the focussed attribute in document element after populating server response */
                                    document.getElementById(state.mainContentReducer.fieldList[0].id).setAttribute('focussed', 'false');
                                }
                            })

                            // screenObj['field']['$']['browse'] = false
                        }

                        break;

                    case state.mainContentReducer.fieldList.length > 1:
                        screenObj['field'] = []

                        state.mainContentReducer.fieldList.forEach((field) => {
                            if ((field.editable && field.editable === 'true') ||
                                (field.visible && field.visible === 'false')) {
                                var obj = { '$': {} }

                                Object.keys(field).forEach((key) => {

                                    if (key === 'value' && document.getElementById(field.id)) {

                                        if (state.serverReducer.ddlList.indexOf(field.id) >= 0)
                                            obj['$'][key] = document.getElementById(field.id).nextSibling.value
                                        else {
                                            if (document.getElementById(field.id).getAttribute('isDate')) {
                                                var date = document.getElementById(field.id).value.replace(/\//g, '');
                                                obj['$'][key] = date.substr(4, 4) + date.substr(2, 2) + date.substr(0, 2)
                                            }
                                            else
                                                obj['$'][key] = document.getElementById(field.id).value
                                        }

                                    } else {
                                        if (key != 'error')
                                            obj['$'][key] = field[key]
                                    }

                                    if (document.getElementById(field.id) &&
                                        document.getElementById(field.id).getAttribute('focussed') &&
                                        document.getElementById(field.id).getAttribute('focussed') === 'true') {

                                        /* set the focus attribute in server response object */
                                        obj['$']['focus'] = 'true';

                                        /* unset the focussed attribute in document element after populating server response */
                                        document.getElementById(field.id).setAttribute('focussed', 'false');
                                    }

                                    // obj['$']['browse'] = false;

                                })
                                screenObj['field'].push(obj);
                            }
                        })


                        break;

                    default:
                        if (startupConfigs.debugMode.debugOn) console.log('hit default in composing xml req')
                }

                /* Populating grid(s) info */
                switch (true) {
                    case state.mainContentReducer.gridList.length === 1:
                        /* compose grid tag when there is only one grid in the list */
                        screenObj['grid'] = {
                            '$': {
                                'id': state.mainContentReducer.gridList[0].id
                            }
                        }

                        screenObj['grid']['rows'] = {}

                        if (Array.isArray(state.mainContentReducer.gridList[0].rows.row)) {
                            /* When there are more than one row in the grid data */
                            screenObj['grid']['rows']['row'] = []

                            state.mainContentReducer.gridList[0].rows.row.forEach((row, idx) => {
                                var rowObj = {
                                    '$': {
                                        'nr': row.nr
                                    },
                                    'item': []
                                }

                                row.item.forEach((col) => {
                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')'))

                                        if ((col['visible'] && col['visible'] === 'false') ||
                                            (col['editable'] && col['editable'] === 'true') ||
                                            (document.getElementById(col.id + '(' + (idx + 1) + ')') && document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true')) {

                                            var colObj = { '$': {} }
                                            console.log("Inside 3", row.item);
                                            for (var key in col) {
                                                if (key === 'value' && document.getElementById(col.id + '(' + (idx + 1) + ')')) {

                                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')').value.trim() != '' &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').value != 'false')

                                                        colObj['$'][key] = document.getElementById(col.id + '(' + (idx + 1) + ')').value

                                                    /* Unset the checkbox */
                                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')').value === 'true') {
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').flagged = 'true';
                                                    }
                                                }
                                                else
                                                    colObj['$'][key] = col[key]
                                            }

                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')') &&
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true') {

                                                /* set the focus attribute in server response object */
                                                colObj['$']['focus'] = 'true'

                                                /* unset the focussed attribute in document element after populating server response */
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').setAttribute('focussed', 'false');
                                            }
                                            rowObj.item.push(colObj);
                                        }
                                })
                                screenObj['grid']['rows']['row'].push(rowObj)
                            })

                        } else if (state.mainContentReducer.gridList[0].rows.row) {
                            /* When there is just one row in the grid data */
                            screenObj['grid']['rows']['row'] = {
                                '$': {
                                    'nr': state.mainContentReducer.gridList[0].rows.row.nr
                                },
                                'item': []
                            }

                            state.mainContentReducer.gridList[0].rows.row.item.forEach((col) => {
                                if ((col['visible'] && col['visible'] === 'false') ||
                                    (col['editable'] && col['editable'] === 'true') ||
                                    (document.getElementById(col.id + '(1)') && document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                        document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true')) {

                                    var colObj = { '$': {} }

                                    for (var key in col) {
                                        if (key === 'value' && document.getElementById(col.id + '(1)')) {

                                            if (document.getElementById(col.id + '(1)').value.trim() != '' &&
                                                document.getElementById(col.id + '(1)').value != 'false')

                                                colObj['$'][key] = document.getElementById(col.id + '(1)').value

                                            /* Unset the checkbox */
                                            if (document.getElementById(col.id + '(1)').value === 'true') {
                                                document.getElementById(col.id + '(1)').flagged = 'true';
                                            }
                                        }
                                        else
                                            colObj['$'][key] = col[key]
                                    }

                                    if (document.getElementById(col.id + '(1)') &&
                                        document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                        document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true') {

                                        /* set the focus attribute in server response object */
                                        colObj['$']['focus'] = 'true'

                                        /* unset the focussed attribute in document element after populating server response */
                                        document.getElementById(col.id + '(1)').setAttribute('focussed', 'false');
                                    }

                                    screenObj['grid']['rows']['row']['item'].push(colObj);
                                }
                            })
                        }

                        break;

                    case state.mainContentReducer.gridList.length > 1:

                        /* compose grid tag when there is more than one grid */
                        screenObj['grid'] = []

                        state.mainContentReducer.gridList.forEach((grid) => {
                            var gridObj = {
                                '$': {
                                    'id': grid.id
                                },
                                'rows': {}
                            }

                            if (Array.isArray(grid.rows.row)) {
                                /* When there are more than one row in the grid data */
                                gridObj['rows']['row'] = []

                                grid.rows.row.forEach((row, idx) => {
                                    var rowObj = {
                                        '$': {
                                            'nr': row.nr
                                        },
                                        'item': []
                                    }

                                    row.item.forEach((col) => {
                                        if ((col['visible'] && col['visible'] === 'false') ||
                                            (col['editable'] && col['editable'] === 'true') ||
                                            (document.getElementById(col.id + '(' + (idx + 1) + ')') && document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true')) {

                                            var colObj = { '$': {} }
                                            console.log("Inside 4", row.item);
                                            for (var key in col) {
                                                if (key === 'value' && document.getElementById(col.id + '(' + (idx + 1) + ')')) {

                                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')').value.trim() != '' &&
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').value != 'false')

                                                        colObj['$'][key] = document.getElementById(col.id + '(' + (idx + 1) + ')').value

                                                    /* Unset the checkbox */
                                                    if (document.getElementById(col.id + '(' + (idx + 1) + ')').value === 'true') {
                                                        document.getElementById(col.id + '(' + (idx + 1) + ')').flagged = 'true';
                                                    }
                                                }
                                                else
                                                    colObj['$'][key] = col[key]
                                            }

                                            if (document.getElementById(col.id + '(' + (idx + 1) + ')') &&
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') &&
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').getAttribute('focussed') === 'true') {

                                                /* set the focus attribute in server response object */
                                                colObj['$']['focus'] = 'true'

                                                /* unset the focussed attribute in document element after populating server response */
                                                document.getElementById(col.id + '(' + (idx + 1) + ')').setAttribute('focussed', 'false');
                                            }

                                            rowObj.item.push(colObj);
                                        }
                                    })

                                    gridObj['rows']['row'].push(rowObj)
                                })

                                screenObj['grid'].push(gridObj);
                            } else if (grid.rows.row) {
                                /* When there is just one row in the grid data */
                                gridObj['rows']['row'] = {
                                    '$': {
                                        'nr': grid.rows.row.nr
                                    },
                                    'item': []
                                }

                                grid.rows.row.item.forEach((col) => {
                                    if ((col['visible'] && col['visible'] === 'false') ||
                                        (col['editable'] && col['editable'] === 'true') ||
                                        (document.getElementById(col.id + '(1)') && document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                            document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true')) {

                                        var colObj = { '$': {} }

                                        for (var key in col) {
                                            if (key === 'value' && document.getElementById(col.id + '(1)')) {

                                                if (document.getElementById(col.id + '(1)').value.trim() != '' &&
                                                    document.getElementById(col.id + '(1)').value != 'false')

                                                    colObj['$'][key] = document.getElementById(col.id + '(1)').value

                                                /* Unset the checkbox */
                                                if (document.getElementById(col.id + '(1)').value === 'true') {
                                                    document.getElementById(col.id + '(1)').flagged = 'true';
                                                }
                                            }
                                            else
                                                colObj['$'][key] = col[key]
                                        }

                                        if (document.getElementById(col.id + '(1)') &&
                                            document.getElementById(col.id + '(1)').getAttribute('focussed') &&
                                            document.getElementById(col.id + '(1)').getAttribute('focussed') === 'true') {

                                            /* set the focus attribute in server response object */
                                            colObj['$']['focus'] = 'true'

                                            /* unset the focussed attribute in document element after populating server response */
                                            document.getElementById(col.id + '(1)').setAttribute('focussed', 'false');
                                        }

                                        gridObj['rows']['row']['item'].push(colObj);
                                    }
                                })
                                screenObj['grid'].push(gridObj);
                            }
                        })

                        break;

                    default:
                        if (startupConfigs.debugMode.debugOn) console.log('hit default in composing xml req')
                }

                reqObj.request.operation.container.push(screenObj)
                // }
            }

            if (state.serverReducer.reqScreen === 'RW7002') {
                var user = reqObj.request.operation.container[1].field.find((fld) => fld['$'].id === 'USRID')
                reqObj.request.userid = user['$']['value'];
            }

            resolve(dispatch(sendServerReq(reqObj, startupConfigs)))
        }


    })
}


// export const readServerResp = (screen) => async (dispatch, getState) => {
//     const state = getState();
//     const response = await apis.get('/getResp/')

//     var jsonRespData = await convertXMLToJSON(response.data.content)

//     var res = jsonRespData.find(element => {
//         return (
//             (element[Object.keys(element)[0]].operation.container[0].field.find((fld) => fld.id === 'ACTION').value === state.serverReducer.action) &&
//             (element[Object.keys(element)[0]].operation.container[0].field.find((fld) => fld.id === 'FUNCTION').value === state.serverReducer.function) &&
//             (element[Object.keys(element)[0]].operation.container[0].field.find((fld) => fld.id === 'REQUESTCODE').value === state.serverReducer.requestCode) &&
//             (element[Object.keys(element)[0]].operation.container[0].field.find((fld) => fld.id === 'SCREEN').value === (screen ? screen : state.serverReducer.screen)) &&
//             Object.keys(element)[0].indexOf(state.serverReducer.fileName) >= 0
//         )
//     });

//     if (screen) {
//         dispatch({
//             type: 'UPDATE_SCREEN',
//             payload: screen
//         })
//     }

//     dispatch({
//         type: 'READ_SERVER_RESP',
//         payload: jsonRespData
//     })

//     dispatch({
//         type: 'READ_PAGE_RESP',
//         payload: res[Object.keys(res)[0]]
//     })
// }

export const reloadApplication = () => async (dispatch, getState) => {

    const state = getState();

    /* Delete cookies */
    setCookie('SessionID', '', 0)
    setCookie('UserID', '', 0)

    /* Reset redux store */
    Promise.resolve(dispatch(resetStore()))
        .then(() => {
            /* Establish session with the server which sets a SessionId cookie */
            Promise.resolve(dispatch(establishSession()))
                .then(async () => {

                    /* Populate DDL data */
                    await Promise.all(state.serverReducer.ddlList.map((ddlCode) => {
                        Promise.resolve(dispatch(fetchDdlList(ddlCode)))
                    }))

                    /* Send Home Page request with default values set in Redux state */
                    dispatch(sendInitialPageRequest())
                })
        })
}

export const sendInitialPageRequest = () => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'SET_REQ_ACTION',
            payload: ''
        })
        dispatch({
            type: 'SET_REQ_FUNC',
            payload: 'W.PROJ.LST'
        })
        dispatch({
            type: 'SET_REQ_LANGID',
            payload: 'E'
        })
        dispatch({
            type: 'SET_REQ_REQUEST_CODE',
            payload: ''
        })
        dispatch({
            type: 'SET_REQ_SCREEN',
            payload: ''
        })
        dispatch({
            type: 'SET_REQ_THREAD',
            payload: ''
        })

        resolve(dispatch(prepareAndSendServerReq()))
    })
}

export const fetchDdlList = (ddlCode) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'SET_REQ_ACTION',
            payload: ''
        })
        dispatch({
            type: 'SET_REQ_FUNC',
            payload: 'GETDDLIST'
        })
        dispatch({
            type: 'SET_REQ_LANGID',
            payload: 'E'
        })
        dispatch({
            type: 'SET_REQ_REQUEST_CODE',
            payload: ddlCode
        })
        dispatch({
            type: 'SET_REQ_SCREEN',
            payload: ''
        })
        dispatch({
            type: 'SET_REQ_THREAD',
            payload: '1'
        })

        resolve(dispatch(prepareAndSendServerReq()))
    })
}


export const fetchBaseTemplate = (screen) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {

        let state = getState();
        let template = Object.assign({}, state.serverReducer.baseTemplates);
        let resp = undefined;

        if (screen) {
            if (!template[screen]) {
                if (state.serverReducer.startupConfigs && state.serverReducer.startupConfigs.debugMode.debugOn) console.log(`Fetching for screen : ../baseTemplates/page-schema-${screen}.json`)

                import('../baseTemplates/page-schema-' + screen + '.json')
                    .then(baseTemp => {
                        template[screen] = baseTemp.default;

                        dispatch(setMainContentNavList(template[screen].navigation))

                        resolve(dispatch({
                            type: 'SET_BASE_TEMPLATE',
                            payload: template
                        }))
                    })
            }
            else {
                resolve(dispatch(setMainContentNavList(template[state.serverReducer.screen].navigation)))
            }
        } else if (state.serverReducer.screen) {

            if (!template[state.serverReducer.screen]) {
                if (state.serverReducer.startupConfigs && state.serverReducer.startupConfigs.debugMode.debugOn) console.log(`Fetching for screen : ../baseTemplates/page-schema-${state.serverReducer.screen}.json`)

                import('../baseTemplates/page-schema-' + state.serverReducer.screen + '.json')
                    .then(baseTemp => {
                        template[state.serverReducer.screen] = baseTemp.default;

                        dispatch(setMainContentNavList(template[state.serverReducer.screen].navigation))

                        resolve(dispatch({
                            type: 'SET_BASE_TEMPLATE',
                            payload: template
                        }))
                    })
            }
            else {
                resolve(dispatch(setMainContentNavList(template[state.serverReducer.screen].navigation)))
            }
        }
    })
}


// export const buttonClickEventHandler = (frameCtrl, reqParams) => async (dispatch, getState) => {
export const buttonClickEventHandler = (reqParams, frameCtrl) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        if (frameCtrl)
            dispatch({
                type: 'UPDATE_FRAME_LOAD',
                payload: frameCtrl
            })
        else
            dispatch({
                type: 'UPDATE_FRAME_LOAD',
                payload: false
            })

        if (reqParams) {
            dispatch({
                type: 'SET_REQ_ACTION',
                payload: reqParams.action
            })
            dispatch({
                type: 'SET_REQ_FUNC',
                payload: reqParams.function
            })
            dispatch({
                type: 'SET_REQ_LANGID',
                payload: reqParams.langId
            })
            dispatch({
                type: 'SET_REQ_REQUEST_CODE',
                payload: reqParams.requestCode
            })
            dispatch({
                type: 'SET_REQ_SCREEN',
                payload: reqParams.screen
            })
            dispatch({
                type: 'SET_REQ_THREAD',
                payload: reqParams.thread
            })
        }

        resolve(dispatch(prepareAndSendServerReq()))
    })
}


export const initialPageHandler = (reqParams) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'SET_REQ_ACTION',
            payload: reqParams.action
        })
        dispatch({
            type: 'SET_REQ_FUNC',
            payload: reqParams.function
        })
        dispatch({
            type: 'SET_REQ_LANGID',
            payload: reqParams.langId
        })
        dispatch({
            type: 'SET_REQ_REQUEST_CODE',
            payload: reqParams.requestCode
        })
        dispatch({
            type: 'SET_REQ_SCREEN',
            payload: reqParams.screen
        })
        dispatch({
            type: 'SET_REQ_THREAD',
            payload: reqParams.thread
        })
        dispatch({
            type: 'UPDATE_SCREEN',
            payload: 'RW7000'
        })

        resolve(setMainContentNavList('BACKTOLOGIN'))
    })
}