import fileDownload from 'js-file-download';
import { fetchDdlList } from "./ServerActions";
import axios from "axios";

export const addToHeadCheckboxList = (headId, status) => async (dispatch, getState) => {
    if (!headId)
        dispatch({
            type: 'SET_DIALOG_HEAD_CHECKBOX_LIST',
            payload: {}
        })
    else {
        const state = getState();
        var data = Object.assign({}, state.dialogScreenReducer.headCheckboxList)
        data[headId] = status

        dispatch({
            type: 'SET_DIALOG_HEAD_CHECKBOX_LIST',
            payload: data
        })
    }
}


export const setDialogScreenData = () => async (dispatch, getState) => {

    return new Promise((resolve, reject) => {
        var state = getState();

        var buttonList = state.dialogScreenReducer.dialogButtonList;
        var caption = state.dialogScreenReducer.dialogCaption;
        var messageList = [];
        var fieldList = state.dialogScreenReducer.dialogFieldList;
        var gridList = [];
        var hiddenFields = [];

        if (Array.isArray(state.serverReducer.dialogBoxResp.operation.container)) {
            state.serverReducer.dialogBoxResp.operation.container.forEach((container) => {
                switch (container.type) {

                    case 'GLOBAL':
                        container.field.forEach(async (field) => {

                            // if (field.id != 'SCREEN')
                            //     await dispatch({
                            //         type: `UPDATE_${field.id}`,
                            //         payload: field.value,
                            //     })
                            // else
                                await dispatch({
                                    type: `UPDATE_DIALOG_${field.id}`,
                                    payload: field.value,
                                })
                        })
                        break;

                    /* Process button list */
                    case 'REQUESTCODELIST':

                        /* Fetch buttons list */
                        if (buttonList && buttonList.length === 0) {
                            if (Array.isArray(container.array)) {
                                if (container.array.find((arrObj) => arrObj.type === 'button')) {
                                    if (Array.isArray(container.array.find((arrObj) => arrObj.type === 'button').item))
                                        buttonList = container.array.find((arrObj) => arrObj.type === 'button').item;
                                    else
                                        buttonList.push(container.array.find((arrObj) => arrObj.type === 'button').item)
                                }
                            } else {
                                if (container.array.type === 'button') {
                                    if (Array.isArray(container.array.item))
                                        buttonList = container.array.item
                                    else
                                        buttonList.push(container.array.item)
                                }
                            }
                            window.buttonList = buttonList;
                        }

                        break;

                    /* Process message list */
                    case 'MESSAGELIST':
                        /* Fetch message list */
                        if (Array.isArray(container.array.item))
                            messageList = container.array.item;
                        else
                            messageList.push(container.array.item);

                        break;

                    /* Process screen elements */
                    case 'SCREEN':
                        /* Fetch caption */
                        if (container.caption) {
                            caption = container.caption.value;
                        }

                        /* Fetch field list */
                        if (container.field && fieldList && fieldList.length === 0) {
                            if (Array.isArray(container.field)) {
                                fieldList = container.field

                                fieldList.forEach(async (field) => {
                                    if (field.id === "FILPTH" && field.value != "") {
                                        axios.get(field.value, {
                                            responseType: 'blob',
                                        })
                                            .then((res) => {
                                                fileDownload(res.data, field.value.split('/')[field.value.split('/').length - 1])
                                            })
                                    }
                                })
                            }
                            else
                                fieldList.push(container.field)
                        }

                        // if (fieldList && fieldList.length && caption === null) {
                        //     console.log('Setting caption again')
                        //     caption = ((field) => field.id === 'CAPTION').value
                        // }

                        /* Fetch grid list */
                        if (container.grid) {
                            if (Array.isArray(container.grid))
                                gridList = container.grid
                            else
                                gridList.push(container.grid)
                        }

                        /* Flag the hidden fields */
                        var visibleFields = [];

                        /* Compose ddl list for which request has to be sent */
                        var ddlArr = [];


                        if (fieldList && fieldList.length)
                            fieldList.filter((field) => state.serverReducer.ddlList.indexOf(field.id) >= 0).forEach((fld) => {
                                ddlArr.push(fld.id)
                            })

                        gridList.forEach((grid, index) => {
                            if (grid.rows.row) {
                                if (Array.isArray(grid.rows.row)) {
                                    grid.rows.row.forEach((row, idx) => {
                                        row.item.forEach((item) => {

                                            /* marking grid updatable */
                                            if (item.editable === 'true' && !gridList[index].updatable)
                                                gridList[index].updatable = 'true'
                                            else if (item.editable === 'false' && !(item.visible && item.visible === 'false'))
                                                gridList[index].updatable = 'false'

                                            /* composing ddlList */
                                            if (state.serverReducer.ddlList.indexOf(item.id) >= 0)
                                                ddlArr.push(item.id)

                                            if ((!item.visible || (item.visible && item.visible != 'false')) && (visibleFields.length === 0 || visibleFields.indexOf(item.id) === -1))
                                                visibleFields.push(item.id);
                                        })

                                        hiddenFields = grid.header.item.filter((item) => visibleFields.indexOf(item.id) === -1)
                                        hiddenFields = hiddenFields.map((field) => field.id)
                                    })
                                } else {
                                    grid.rows.row.item.forEach((item, idx) => {

                                        /* marking grid updatable */
                                        if (item.editable === 'true' && !gridList[index].updatable)
                                            gridList[index].updatable = 'true'
                                        else if (item.editable === 'false' && !(item.visible && item.visible === 'false'))
                                            gridList[index].updatable = 'false'

                                        /* composing ddlList */
                                        if (state.serverReducer.ddlList.indexOf(item.id) >= 0)
                                            ddlArr.push(item.id)

                                        if ((!item.visible || (item.visible && item.visible != 'false')) && (visibleFields.length === 0 || visibleFields.indexOf(item.id) === -1))
                                            visibleFields.push(item.id);

                                        hiddenFields = grid.header.item.filter((item) => visibleFields.indexOf(item.id) === -1)
                                        hiddenFields = hiddenFields.map((field) => field.id)
                                    })
                                }
                            }
                        })

                        ddlArr = [...new Set(ddlArr)];

                        /* Send DDL List request */
                        ddlArr.forEach((ddlId) => {
                            if (state.serverReducer.ddlData[ddlId] === undefined) {
                                dispatch(fetchDdlList(ddlId))
                            }
                        })

                        break;

                    default:
                        break;
                }
            })

            messageList.forEach((msg) => {
                if (msg.fieldId && msg.fieldId.indexOf(',') > 0) {
                    var fields = msg.fieldId.split(',')

                    fields.forEach((fieldId) => {
                        if (document.getElementById(fieldId)) {
                            fieldList.forEach((fld) => {
                                if (fld.id === fieldId) {
                                    fld.error = 'true'
                                }

                                setCookie('UserID', '', 0);
                            })
                        }
                    })
                } else if (msg.fieldId && document.getElementById(msg.fieldId)) {
                    fieldList.forEach((fld) => {
                        if (fld.id === msg.fieldId) {
                            fld.error = 'true'
                        }

                        if (msg.fieldId.indexOf(',') > 0) {
                            var fields = msg.fieldId.split(',');

                            if (fields.indexOf(fld.id) >= 0) {
                                fld.error = 'true'
                            }

                            setCookie('UserID', '', 0);
                        }
                    })

                    var flag = 0;
                    gridList.forEach((grid) => {
                        grid.rows.row.forEach((row) => {
                            row.item.forEach((col) => {
                                if (msg.fieldId.search(col.id) === 0 && !flag) {
                                    flag = 1;
                                    col.error = 'true'
                                }
                            })
                        })
                    })
                }
            })

        } else {
            state.serverReducer.dialogBoxResp.operation.container.field.forEach(async (field) => {
                if (field.value === '*LOGOFF')
                    await dispatch({
                        type: `UPDATE_${field.id}`,
                        payload: 'LOGOFF',
                    })
                else
                    await dispatch({
                        type: `UPDATE_${field.id}`,
                        payload: field.value,
                    })
            })
        }

        dispatch({
            type: "SET_DIALOG_BUTTON_LIST",
            payload: buttonList,
        });

        dispatch({
            type: "SET_DIALOG_MSG_LIST",
            payload: messageList,
        });

        dispatch({
            type: "SET_DIALOG_CAPTION",
            payload: caption,
        });

        dispatch({
            type: "SET_DIALOG_FIELD_LIST",
            payload: fieldList,
        });

        dispatch({
            type: "SET_DIALOG_GRID_LIST",
            payload: gridList,
        });

        dispatch({
            type: "SET_DIALOG_GRID_HIDDEN_FLDS",
            payload: hiddenFields,
        });

        resolve();
    })

};