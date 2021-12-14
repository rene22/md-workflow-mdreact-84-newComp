/** @format */

import { fetchDdlList } from './ServerActions';
import fileDownload from 'js-file-download';
import axios from 'axios';

export const setMainContentData = () => async (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    var state = getState();

    var buttonList = state.serverReducer.frameLoad
      ? state.mainContentReducer.buttonList
      : [];
    var caption = state.serverReducer.frameLoad
      ? state.mainContentReducer.caption
      : null;
    var messageList = [];
    var fieldList = state.serverReducer.frameLoad
      ? state.mainContentReducer.fieldList
      : [];
    var gridList = [];
    var hiddenFields = [];

    if (Array.isArray(state.serverReducer.pageResp.operation.container)) {
      state.serverReducer.pageResp.operation.container.forEach((container) => {
        switch (container.type) {
          case 'GLOBAL':
            container.field.forEach(async (field) => {
              await dispatch({
                type: `UPDATE_${field.id}`,
                payload: field.value,
              });
            });
            break;

          /* Process button list */
          case 'REQUESTCODELIST':
            /* Fetch buttons list */
            if (buttonList.length === 0) {
              if (Array.isArray(container.array)) {
                if (
                  container.array.find((arrObj) => arrObj.type === 'button')
                ) {
                  if (
                    Array.isArray(
                      container.array.find((arrObj) => arrObj.type === 'button')
                        .item
                    )
                  )
                    buttonList = container.array.find(
                      (arrObj) => arrObj.type === 'button'
                    ).item;
                  else
                    buttonList.push(
                      container.array.find((arrObj) => arrObj.type === 'button')
                        .item
                    );
                }
              } else {
                if (container.array.type === 'button') {
                  if (Array.isArray(container.array.item))
                    buttonList = container.array.item;
                  else buttonList.push(container.array.item);
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
            else messageList.push(container.array.item);

            break;

          /* Process screen elements */
          case 'SCREEN':
            /* Fetch caption */
            if (container.caption && caption === null)
              caption = container.caption.value;

            /* Fetch field list */
            if (container.field && fieldList.length === 0) {
              if (Array.isArray(container.field)) {
                fieldList = container.field;

                fieldList.forEach(async (field) => {
                  if (
                    (field.id === 'FILPTH' || field.id === 'XLSPTH') &&
                    field.value != ''
                  ) {
                    axios
                      .get(field.value, {
                        responseType: 'blob',
                      })
                      .then((res) => {
                        fileDownload(
                          res.data,
                          field.value.split('/')[
                            field.value.split('/').length - 1
                          ]
                        );
                      });
                  }

                  // /* Check for specialities like GETBOX for rtf */
                  // if (field.id === "GETBOX") {
                  //   dispatch(fetchBox(ddlId))
                  // }
                });
              } else fieldList.push(container.field);
            }

            if (fieldList.length && caption === null) {
              caption = ((field) => field.id === 'CAPTION').value;
            }

            /* Fetch grid list */
            if (container.grid) {
              if (Array.isArray(container.grid)) gridList = container.grid;
              else gridList.push(container.grid);
            }

            /* Flag the hidden fields */
            var visibleFields = [];

            /* Compose ddl list for which request has to be sent */
            var ddlArr = [];

            fieldList
              .filter(
                (field) => state.serverReducer.ddlList.indexOf(field.id) >= 0
              )
              .forEach((fld) => {
                ddlArr.push(fld.id);
              });

            gridList.forEach((grid, index) => {
              if (grid.rows.row) {
                if (Array.isArray(grid.rows.row)) {
                  grid.rows.row.forEach((row, idx) => {
                    row.item.forEach((item) => {
                      /* marking grid updatable */
                      if (
                        item.editable === 'true' &&
                        !gridList[index].updatable
                      )
                        gridList[index].updatable = 'true';
                      else if (
                        item.editable === 'false' &&
                        !(item.visible && item.visible === 'false')
                      )
                        gridList[index].updatable = 'false';

                      /* composing ddlList */
                      if (state.serverReducer.ddlList.indexOf(item.id) >= 0)
                        ddlArr.push(item.id);

                      if (
                        (!item.visible ||
                          (item.visible && item.visible != 'false')) &&
                        (visibleFields.length === 0 ||
                          visibleFields.indexOf(item.id) === -1)
                      )
                        visibleFields.push(item.id);
                    });

                    hiddenFields = grid.header.item.filter(
                      (item) => visibleFields.indexOf(item.id) === -1
                    );
                    hiddenFields = hiddenFields.map((field) => field.id);
                  });
                } else {
                  grid.rows.row.item.forEach((item, idx) => {
                    /* marking grid updatable */
                    if (item.editable === 'true' && !gridList[index].updatable)
                      gridList[index].updatable = 'true';
                    else if (
                      item.editable === 'false' &&
                      !(item.visible && item.visible === 'false')
                    )
                      gridList[index].updatable = 'false';

                    /* composing ddlList */
                    if (state.serverReducer.ddlList.indexOf(item.id) >= 0)
                      ddlArr.push(item.id);

                    if (
                      (!item.visible ||
                        (item.visible && item.visible != 'false')) &&
                      (visibleFields.length === 0 ||
                        visibleFields.indexOf(item.id) === -1)
                    )
                      visibleFields.push(item.id);

                    hiddenFields = grid.header.item.filter(
                      (item) => visibleFields.indexOf(item.id) === -1
                    );
                    hiddenFields = hiddenFields.map((field) => field.id);
                  });
                }
              }
            });

            ddlArr = [...new Set(ddlArr)];

            /* Send DDL List request */
            ddlArr.forEach((ddlId) => {
              if (state.serverReducer.ddlData[ddlId] === undefined) {
                dispatch(fetchDdlList(ddlId));
              }
            });

            break;

          default:
            break;
        }
      });

      messageList.forEach((msg) => {
        if (msg.fieldId && msg.fieldId.indexOf(',') > 0) {
          var fields = msg.fieldId.split(',');

          fields.forEach((fieldId) => {
            if (document.getElementById(fieldId)) {
              fieldList.forEach((fld) => {
                if (fld.id === fieldId) {
                  fld.error = 'true';
                }

                // setCookie('UserID', '', 0);
              });
            }
          });
        } else if (msg.fieldId && document.getElementById(msg.fieldId)) {
          fieldList.forEach((fld) => {
            if (fld.id === msg.fieldId) {
              fld.error = 'true';
            }

            if (msg.fieldId.indexOf(',') > 0) {
              var fields = msg.fieldId.split(',');

              if (fields.indexOf(fld.id) >= 0) {
                fld.error = 'true';
              }

              // setCookie('UserID', '', 0);
            }
          });

          if (msg.fieldId.indexOf('(') > 0) {
            var flag = 0;
            if (Array.isArray(gridList)) {
              gridList.forEach((grid) => {
                if (Array.isArray(grid.rows.row)) {
                  grid.rows.row.forEach((row) => {
                    row.item.forEach((col) => {
                      if (
                        parseInt(row.nr) ===
                          parseInt(msg.fieldId.split('(')[1].split(')')[0]) &&
                        msg.fieldId.search(col.id) === 0 &&
                        !flag
                      ) {
                        flag = 1;
                        col.error = 'true';
                      }
                    });
                  });
                } else {
                  grid.rows.row.item.forEach((col) => {
                    if (
                      parseInt(row.nr) ===
                        parseInt(msg.fieldId.split('(')[1].split(')')[0]) &&
                      msg.fieldId.search(col.id) === 0 &&
                      !flag
                    ) {
                      flag = 1;
                      col.error = 'true';
                    }
                  });
                }
              });
            } else {
              if (Array.isArray(gridList.rows.row)) {
                gridList.rows.row.forEach((row) => {
                  row.item.forEach((col) => {
                    if (
                      parseInt(row.nr) ===
                        parseInt(msg.fieldId.split('(')[1].split(')')[0]) &&
                      msg.fieldId.search(col.id) === 0 &&
                      !flag
                    ) {
                      flag = 1;
                      col.error = 'true';
                    }
                  });
                });
              } else {
                gridList.rows.row.item.forEach((col) => {
                  if (
                    parseInt(row.nr) ===
                      parseInt(msg.fieldId.split('(')[1].split(')')[0]) &&
                    msg.fieldId.search(col.id) === 0 &&
                    !flag
                  ) {
                    flag = 1;
                    col.error = 'true';
                  }
                });
              }
            }
          }
        }
      });
    } else {
      state.serverReducer.pageResp.operation.container.field.forEach(
        async (field) => {
          if (field.value === '*LOGOFF')
            await dispatch({
              type: `UPDATE_${field.id}`,
              payload: 'LOGOFF',
            });
          else
            await dispatch({
              type: `UPDATE_${field.id}`,
              payload: field.value,
            });
        }
      );
    }

    dispatch({
      type: 'SET_MAIN_CONTENT_BUTTON_LIST',
      payload: buttonList,
    });

    dispatch({
      type: 'SET_MAIN_CONTENT_MSG_LIST',
      payload: messageList,
    });

    dispatch({
      type: 'SET_MAIN_CONTENT_CAPTION',
      payload: caption,
    });

    dispatch({
      type: 'SET_MAIN_CONTENT_FIELD_LIST',
      payload: fieldList,
    });

    dispatch({
      type: 'SET_MAIN_CONTENT_GRID_LIST',
      payload: gridList,
    });

    dispatch({
      type: 'SET_MAIN_CONTENT_GRID_HIDDEN_FLDS',
      payload: hiddenFields,
    });

    resolve();
  });
};

export const setMainContentNavList =
  (data, index) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const state = getState();
      var navList = state.mainContentReducer.navList.slice(0);

      if (data === 'LOGOFF' || data === 'BACKTOLOGIN') {
        navList.splice(1, navList.length - 1);
      } else if (data) {
        var newNavData = {
          id: data,
          screen: state.serverReducer.screen,
        };

        if (
          navList.length === 0 ||
          navList.find(
            (nav) =>
              nav.id === newNavData.id && nav.screen === newNavData.screen
          ) === undefined
        ) {
          navList.push(newNavData);
        } else if (
          navList.findIndex(
            (nav) =>
              nav.id === newNavData.id && nav.screen === newNavData.screen
          ) >= 0
        ) {
          navList.splice(
            navList.findIndex(
              (nav) =>
                nav.id === newNavData.id && nav.screen === newNavData.screen
            ) + 1
          );
        }
      } else {
        navList.splice(-1, 1);
      }

      resolve(
        dispatch({
          type: 'SET_MAIN_CONTENT_NAVLIST',
          payload: navList,
        })
      );
    });
  };

export const clearSearchFilters = (frameId) => async (dispatch, getState) => {
  const state = getState();
  var template = Object.assign({}, state.serverReducer.baseTemplates);

  setComponentDisabled(frameId);

  template[state.serverReducer.screen].frame.forEach((frame) => {
    if (frame.id === frameId) {
      if (frame.dropdowns) {
        frame.dropdowns.forEach((elem) => {
          if (document.getElementById(elem))
            document.getElementById(elem).nextSibling.value = '';
        });
      }

      if (frame.fields) {
        frame.fields.forEach((elem) => {
          if (document.getElementById(elem.id))
            document.getElementById(elem.id).value = '';
        });
      }
    }
  });

  setComponentEnabled(frameId);
};

export const setDialogPopUp = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'SET_MAIN_CONTENT_DIALOG_POPUP',
    payload: data,
  });
};

export const setComponentEnabled = (frameId) => async (dispatch, getState) => {
  const state = getState();
  var template = Object.assign({}, state.serverReducer.baseTemplates);

  template[state.serverReducer.screen].frame.forEach((frame) => {
    if (frame.id === frameId) {
      frame.enable = 'true';
    }
  });

  dispatch({
    type: 'SET_BASE_TEMPLATE',
    payload: template,
  });
};

export const setComponentDisabled = (frameId) => async (dispatch, getState) => {
  const state = getState();
  var template = Object.assign({}, state.serverReducer.baseTemplates);

  template[state.serverReducer.screen].frame.forEach((frame) => {
    if (frame.id === frameId) frame.enable = 'false';
  });

  dispatch({
    type: 'SET_BASE_TEMPLATE',
    payload: template,
  });
};

export const addToHeadCheckboxList =
  (headId, status) => async (dispatch, getState) => {
    if (!headId)
      dispatch({
        type: 'SET_MAIN_CONTENT_HEAD_CHECKBOX_LIST',
        payload: {},
      });
    else {
      const state = getState();
      var data = Object.assign({}, state.mainContentReducer.headCheckboxList);
      data[headId] = status;

      dispatch({
        type: 'SET_MAIN_CONTENT_HEAD_CHECKBOX_LIST',
        payload: data,
      });
    }
  };

export const setItemValue =
  (item, value, idx) => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const state = getState();

      /* Find the item in Fieldlist */
      if (
        state.mainContentReducer.fieldList.findIndex(
          (field) => field.id === item.id
        ) >= 0
      ) {
        var fieldList = state.mainContentReducer.fieldList.slice(0);
        fieldList[
          state.mainContentReducer.fieldList.findIndex(
            (field) => field.id === item.id
          )
        ].value = value != '' ? value : '';

        resolve(
          dispatch({
            type: 'SET_MAIN_CONTENT_FIELD_LIST',
            payload: fieldList,
          })
        );
      } else {
        var gridList = state.mainContentReducer.gridList.slice(0);

        gridList.forEach((grid) => {
          // if (typeof item != 'object') {
          //   if (Array.isArray(grid.rows.row)) { /* If there is more than one row, map through each row */
          //     grid.rows.row.forEach((row, index) => {
          //       row.item.forEach((col) => {
          //         if (col.id === item && index === idx - 1) {
          //           col.value = value
          //           console.log('Setting the action value: ', row)
          //           // col['focus'] = 'true'
          //         }
          //       })
          //     })
          //   } else { /* If there is just one row, map through each column in a row */
          //     grid.rows.row.item.forEach((col) => {
          //       if (col.id === item) {
          //         col.value = value
          //         // col['focus'] = 'true'
          //       }
          //     })
          //   }
          // }
          if (
            grid.rows != '' &&
            grid.header.item.findIndex(
              (head) =>
                head.id === item.id || head.id === item.id.split('Head')[0]
            ) >= 0
          ) {
            if (Array.isArray(grid.rows.row)) {
              /* If there is more than one row, map through each row */
              if (item.id.search('Head') > 0) {
                grid.rows.row.forEach((row) => {
                  row.item.forEach((col) => {
                    if (
                      col.id === item.id.split('Head')[0] &&
                      col.editable === 'true'
                    )
                      col.value = value;
                  });
                });
              } else if (idx) {
                grid.rows.row[idx - 1].item.forEach((col) => {
                  if (col.id === item.id && col.editable === 'true') {
                    col.value = value;
                  }
                });
              }
            } else {
              /* If there is just one row, map through each column in a row */
              if (idx || item.id.search('Head') > 0) {
                grid.rows.row.item.forEach((col) => {
                  if (
                    (col.id === item.id.split('Head')[0] ||
                      col.id === item.id) &&
                    col.editable === 'true'
                  )
                    col.value = value;
                });
              }
            }
          }
        });
        console.log('Final gridlist: ', gridList);
        resolve(
          dispatch({
            type: 'SET_MAIN_CONTENT_GRID_LIST',
            payload: gridList,
          })
        );
      }
    });
  };
