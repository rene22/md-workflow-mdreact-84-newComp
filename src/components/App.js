import React, { useEffect } from 'react';
import PageController from './PageController';
import { MuiThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import { withCookies } from 'react-cookie';
import { BrowserRouter, Route, RouteComponentProps, withRouter } from 'react-router-dom';

// var styles = undefined;

// The following code renders the application
function App(props) {
    const { cookies } = props;
    const useStyles = makeStyles(props.styles)
    const classes = useStyles();
    const ComponentWithHistory = withRouter(PageController);

    return (
        <BrowserRouter>
            <Route path="/">
                {
                    props.theme && classes ?
                        <MuiThemeProvider theme={props.theme}>
                            <ComponentWithHistory  classes={classes} {...props} />
                        </MuiThemeProvider>
                        : ''
                }
            </Route>
        </BrowserRouter>
    );
}

export default withCookies(App);