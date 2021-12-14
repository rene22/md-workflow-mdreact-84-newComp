import apis from '../apis';
import { setStartupConfigs } from './ServerActions';
import { setDialogPopUp } from './MainContentActions';

export const establishSession = () => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

        const state = getState();

        if (!localStorage.getItem('sessionRetryCount'))
            localStorage.setItem('sessionRetryCount', 0);

        var startupConfigs = state.serverReducer.startupConfigs ?
            state.serverReducer.startupConfigs : undefined;

        var count = parseInt(localStorage.getItem('sessionRetryCount'));

        if (count < 3) {
            fetch("./startup.json")
                .then(response => response.json())
                .then(async (startupConfigs) => {

                    dispatch({
                        type: "SET_STARTUP_CONFIGS",
                        payload: startupConfigs

                    })

                    dispatch({
                        type: 'SET_AWAIT_RESPONSE',
                        payload: true
                    })

                    var response = undefined;
                    var url = startupConfigs.deploymentMode === 'server' ?
                        '../../MDREP' + startupConfigs.sessionPayload.environment + '/' + startupConfigs.apiPaths.MRDCONREP :
                        startupConfigs.apiPath + 'MDREP' + startupConfigs.sessionPayload.environment + '/' + startupConfigs.apiPaths.MRDCONREP;
                        
                    const bodyParam = startupConfigs.sessionPayload;
                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                        }
                    };

                    if (startupConfigs.debugMode.debugOn) console.log('Sending session establishment request: \n', bodyParam)

                    await apis.post(url, bodyParam, axiosConfig, { timeout: 15000 })
                        .then((resp) => {
                            response = resp;

                            if (response && response.status === 200) {
                                localStorage.setItem('sessionRetryCount', 0)

                                dispatch({
                                    type: 'SET_AWAIT_RESPONSE',
                                    payload: false
                                })

                                if (startupConfigs.debugMode.debugOn) console.log('Session establishment response from server: \n', response)

                                // Uncomment for LOCAL
                                setCookie('SessionID', `1-${response.data.jobnumber}`, 86400 * 30)
                                setCookie('UserID', `dummy`, 86400 * 30)

                                resolve(dispatch({
                                    type: 'SET_SESSION_INFO',
                                    payload: {
                                        jobNumber: response.data.jobnumber,
                                    }
                                }))
                            } else if (response && response.status === 503) {
                                if (startupConfigs.debugMode.debugOn) console.log('Response error: ', response.status);

                                localStorage.setItem('sessionRetryCount', count + 1)

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
                            } else if (response && response.status === 404) {
                                if (startupConfigs.debugMode.debugOn) console.log('Response error: ', response.status);

                                localStorage.setItem('sessionRetryCount', count + 1)

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
                                if (startupConfigs.debugMode.debugOn) console.log('Response error');

                                localStorage.setItem('sessionRetryCount', count + 1)

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

                                resolve();
                            }
                        })
                        .catch((err) => {
                            if (startupConfigs.debugMode.debugOn) console.log('Exception error: ', err.response)

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

                })
                .catch((err) => {
                    if (startupConfigs.debugMode.debugOn) console.log('Exception error: ', err.response)

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
        } else {
            console.log('Max. session establishment retries reached, please try after sometime.');

            dispatch(setDialogPopUp({
                header: "Error",
                content: {
                    title: `Message: Max. session establishment retries reached, please try after sometime.`,
                },
                action: "Dismiss"
            }))
        }

    })

}

export const resetStore = () => async dispatch => {
    return new Promise((resolve, reject) => {

        if (localStorage.getItem('state') != undefined)
            localStorage.removeItem('state');

        resolve(dispatch({
            type: 'RESET'
        }))
    })
}


export const setSessionInfo = (jobNumber) => async dispatch => {
    dispatch({
        type: 'SET_SESSION_INFO',
        payload: {
            jobNumber: jobNumber,
        }
    })
}