export const setSidebarData = (pageData) => async (dispatch, getState) => {

  var state = getState();

  if (!state.serverReducer.frameLoad) {
    
  /* Extract and set sidebar data from page response */
  var data =
      Array.isArray(pageData.operation.container) ?
        pageData.operation.container.find((conObj) => conObj.type === 'REQUESTCODELIST') ?
          Array.isArray(pageData.operation.container.find((conObj) => conObj.type === 'REQUESTCODELIST').array) ?
            pageData.operation.container.find((conObj) => conObj.type === 'REQUESTCODELIST').array.find((arrObj) => arrObj.type === 'link') ?
              pageData.operation.container.find((conObj) => conObj.type === 'REQUESTCODELIST').array.find((arrObj) => arrObj.type === 'link')
              : null
            : pageData.operation.container.find((conObj) => conObj.type === 'REQUESTCODELIST').array.type === 'link' ?
              pageData.operation.container.find((conObj) => conObj.type === 'REQUESTCODELIST').array
              : null
          : null
        : null

    /* Set sidebar header redux state  */
    dispatch({
      type: 'SET_SIDEBAR_HEADER',
      payload: data ? data.value : null
    })

    /* Set sidebar links redux state  */
    dispatch({
      type: 'SET_SIDEBAR_LINKS',
      payload: data ? data.item : null
    })
  }
}