import apis from "../apis/index";

export const setTopbarData = () => async (dispatch, getState) => {
  var state = getState();

  fetch("./build.json")
    .then(response => response.json())
    .then(async (data) => {

      // var buildData = {
      //   header: "Contact",
      //   content: {
      //     title: "Contact Midrange Dynamics for Assistance",
      //     link: "https://support.mdcms.ch/login.jsp",
      //     content: undefined
      //   }
      // };

      // Object.keys(data).forEach((key) => {
      //   buildData.content = buildData.content + `${key}: ${data[key]}\n\n`
      // })

      var buildData = state.topbarReducer.contactInfo;
      buildData.content.details = '';
      
      Object.keys(data).forEach((key) => {
        buildData.content.details = buildData.content.details + `${key}: ${data[key]}\n\n`
      })

      dispatch({
        type: "SET_TOPBAR_CONTACT_INFO",
        payload: buildData
      })

      dispatch({
        type: "SET_BUILD_VERSION",
        payload: data.Build
      })

    })
};
