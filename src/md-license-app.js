import { createMuiTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';
import sidebar from './images/sidebar.png';
import "./styles/style.css";

var theme = undefined;
var styles = undefined;
const muiBaseTheme = createMuiTheme();
var siteSettings = undefined;

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    window.history.pushState(state, null, "");
  }
  catch (e) {
    console.log(e);
  }
}

function evaluateJson(jsonObj) {
  Object.keys(jsonObj).forEach((attr) => {

    if (typeof jsonObj[attr] === 'object') {
      evaluateJson(jsonObj[attr])
    }
    else {
      jsonObj[attr] = isNaN(jsonObj[attr]) && jsonObj[attr].search('`') >= 0 ?
        eval(jsonObj[attr]) : jsonObj[attr];
    }
  })
  return;
}

function loadFromLocalStorage() {
  return new Promise((resolve, reject) => {
    try {
      const serializedState = localStorage.getItem('state');
      window.history.replaceState(serializedState, null, "");

      if (localStorage.getItem('sessionRetryCount') && localStorage.getItem('sessionRetryCount') >= 3)
        localStorage.setItem('sessionRetryCount', 0);

      /* Fetch theme.json and apply */
      fetch("./theme.json")
        .then(response => response.json())
        .then(async (themeData) => {
          siteSettings = themeData.siteSettings;

          /* Parse theme and evaluate the escaped variables */
          evaluateJson(themeData.customisation);

          /* Apply muiBaseTheme toolbar attributes */
          if (themeData.customisation.overrides.MuiToolbar)
            themeData.customisation.overrides.MuiToolbar.root = {
              ...themeData.customisation.overrides.MuiToolbar.root,
              ...muiBaseTheme.mixins.toolbar
            }

          theme = createMuiTheme(themeData.customisation);

          /* Fetch components.json and apply */
          fetch("./components.json")
            .then(response => response.json())
            .then(async (componentsData) => {

              /* Parse components styling and evaluate the escaped variables */
              evaluateJson(componentsData);

              styles = componentsData;

              /* Apply muiBaseTheme toolbar attributes */
              styles.toolbar = {
                ...styles.toolbar,
                ...muiBaseTheme.mixins.toolbar
              }

              styles.content.transition =
                `${theme.transitions.create('margin', styles.content.transition)}ms`

              styles.contentShift.transition =
                `${theme.transitions.create('margin', styles.contentShift.transition)}ms`

              /* Fetch the build file */
              fetch("./build.json")
                .then(response => response.json())
                .then(async (data) => {

                  if (serializedState === null) {
                    resolve(undefined)

                  } else if (serializedState != null && JSON.parse(serializedState).topbarReducer &&
                    // JSON.parse(serializedState).topbarReducer.version != data.Build) {

                    // Uncomment for LOCAL
                    true) {

                    setCookie('SessionID', '', 0)
                    setCookie('UserID', '', 0)

                    resolve(undefined)
                  }
                  else {
                    resolve(JSON.parse(serializedState))
                  }
                })
            })
        })
    }
    catch (e) {
      console.log(e)
      resolve()
    }
  })
}

var store = undefined;

async function main() {

  const persistedState = await loadFromLocalStorage()
  store = createStore(reducers, persistedState, applyMiddleware(thunk));
  store.subscribe(() => saveToLocalStorage(store.getState()));

  return ReactDOM.hydrate(<Index />, document.getElementById('page'))
}

const Index = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        {theme && styles ?
          <App theme={theme} styles={styles} />
          : ''
        }
      </Provider>
    </CookiesProvider>
  )
};

main();