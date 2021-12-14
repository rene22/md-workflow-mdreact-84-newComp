import React, { useEffect, useState, useCallback } from 'react';
import TransitionAlert from './TransitionAlert';
import { connect } from 'react-redux';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { setMainContentData, setMainContentNavList, addToHeadCheckboxList } from '../actions/MainContentActions'
import BreadCrumb from './BreadCrumb';
import clsx from 'clsx';
import PageRenderer from './PageRenderer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const mapStateToProps = (state) => {
  return {
    awaitResponse: state.serverReducer.awaitResponse,
    ddlData: state.serverReducer.ddlData,
    caption: state.mainContentReducer.caption,
    navList: state.mainContentReducer.navList,
    msgList: state.mainContentReducer.messageList,
    buttonList: state.mainContentReducer.buttonList,
    fieldList: state.mainContentReducer.fieldList,
    gridList: state.mainContentReducer.gridList,
    hiddenFields: state.mainContentReducer.hiddenFields,
    headCheckboxList: state.mainContentReducer.headCheckboxList
  }
}

function Maincontent(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [switchedOn, setSwitchedOn] = React.useState(true);

  const handleSwitchChange = () => {
    setSwitchedOn((prev) => !prev);
  };

  useEffect(() => {
    if (props.pageResp && props.currentScreen != 'LOGOFF') {
      props.setMainContentData();
    }

    if (props.headCheckboxList)
      props.addToHeadCheckboxList();

  }, [props.pageResp])

  useEffect(() => {
    setOpen(props.awaitResponse);
  }, [props.awaitResponse])

  /* Rendering main component */
  return (
    <div id='mainContent' className={classes.mainContent}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open,
        })}
      >

        {/* To leave space on top to prevent overlapping with Topbar */}
        <div className={classes.toolbar} />

        <Grid container spacing={2} className={classes.drawerOpenButton}>

          {/* Button to open sidebar */}
          <Grid
            item
            xs={12}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, props.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Grid>

          {/* Main content header rendering i.e. breadcrumb, caption & alert messages */}
          <Grid
            item xs={12}
            id='frame1'
          >
            {props.navList ?
              <BreadCrumb
                {...props}
              />
              : ''
            }

            <Typography
              variant="h6"
              className={classes.caption}
            >
              {props.caption}
            </Typography>

            {props.msgList.length ?
              props.msgList.map((msg) => (
                <TransitionAlert
                  item={msg}
                  key={msg.value}
                  {...props}
                />
              ))
              :
              ''
            }
          </Grid>

          <Backdrop
            open={open}
            className={classes.backdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {/* Main content elements rendering */}
          <Grid
            item
            xs={12}
          >
            <Paper
              elevation={1}
            >
              {props.currentScreen ?
                <PageRenderer
                  name={props.currentScreen}
                  switchedOn={switchedOn}
                  handleSwitchChange={handleSwitchChange}
                  {...props}
                />
                : ''
              }

              {/* <Grid
                container
                spacing={0}

                style={props.baseTemplates[props.currentScreen] && props.baseTemplates[props.currentScreen].frame &&
                  props.baseTemplates[props.currentScreen].frame.find((frame) =>
                    frame.style != undefined
                  ) != undefined ?
                  Object.assign({}, {
                    backgroundColor: `${props.baseTemplates[props.currentScreen].frame.find((frame) =>
                      frame.style != undefined
                    ).style.backgroundColor}`,
                    width: `${props.baseTemplates[props.currentScreen].frame.find((frame) =>
                      frame.style != undefined && frame.style.width
                    ) != undefined ? props.baseTemplates[props.currentScreen].frame.find((frame) =>
                      frame.style != undefined && frame.style.width
                    ).style.width : ''}`
                  }) : {}}

                className={
                  props.baseTemplates[props.currentScreen] && props.baseTemplates[props.currentScreen].frame &&
                    props.baseTemplates[props.currentScreen].frame.find((frame) =>
                      frame.type === 'action-type1' || frame.type === 'search-type1'
                    ) != undefined ?
                    classes.gridContainer : ''
                }>

                {
                  props.baseTemplates[props.currentScreen] ?
                    <PageRenderer
                      name={props.currentScreen}
                      switchedOn={switchedOn}
                      handleSwitchChange={handleSwitchChange}
                      {...props}
                    />
                    : ''
                }
              </Grid> */}
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default connect(mapStateToProps, { setMainContentData, setMainContentNavList, addToHeadCheckboxList })(Maincontent);