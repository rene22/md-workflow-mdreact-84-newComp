import React, { useEffect, useState, useCallback } from 'react';
import TransitionAlert from './TransitionAlert';
import { connect } from 'react-redux';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { setDialogScreenData, addToHeadCheckboxList } from '../actions/DialogScreenActions'
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DialogScreenRenderer from './DialogScreenRenderer';

const mapStateToProps = (state) => {
  return {
    ddlData: state.serverReducer.ddlData,
    dialogCaption: state.dialogScreenReducer.dialogCaption,
    dialogMsgList: state.dialogScreenReducer.dialogMessageList,
    dialogButtonList: state.dialogScreenReducer.dialogButtonList,
    dialogFieldList: state.dialogScreenReducer.dialogFieldList,
    dialogGridList: state.dialogScreenReducer.dialogGridList,
    dialogHiddenFields: state.dialogScreenReducer.dialogHiddenFields,
    dialogHeadCheckboxList: state.dialogScreenReducer.dialogHeadCheckboxList
  }
}

function DialogScreenPopUp(props) {

  const { classes } = props;
  const [switchedOn, setSwitchedOn] = React.useState(true);

  const handleSwitchChange = () => {
    setSwitchedOn((prev) => !prev);
  };

  // const [dialogOpen, setDialogOpen] = React.useState(false);
  // // const [dialogTitle, setDialogTitle] = React.useState("");
  // // const [dialogContent, setDialogContent] = React.useState("");

  // const handleDialog = (e) => {
  //   setDialogTitle(props.contactInfo.header);
  //   setDialogContent(props.contactInfo.content);
  //   setDialogOpen(true);
  // };

  // const handleScreenDialogClose = () => {
  //   setDialogOpen(false);
  // };

  useEffect(() => {
    if (props.dialogBoxResp) {
      props.setDialogScreenData();
    }

    if (props.headCheckboxList)
      props.addToHeadCheckboxList();

  }, [props.dialogBoxResp])

  // useEffect(() => {
  //   setDialogOpen(props.awaitResponse);
  // }, [props.awaitResponse])

  /* Rendering dialog component */
  return (
    <div id='dialogContent' className={classes.dialogContent}>
      <Dialog
        onClose={props.handleScreenDialogClose}
        aria-labelledby="customized-dialog-title"
        open={props.dialogScreenOpen}
        maxWidth={"lg"}
      // className={classes.contactCard}
      >

        <MuiDialogTitle disableTypography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleScreenDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>

        <DialogTitle
          id="customized-dialog-title"
          onClose={props.handleScreenDialogClose}
        >
          {props.dialogCaption}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} className={classes.drawerOpenButton}>

            {/* Main content header rendering i.e. breadcrumb, caption & alert messages */}
            <Grid
              item xs={12}
              id='frame1'
            >

              {props.dialogMsgList.length ?
                props.props.MsgList.map((msg) => (
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

            {/* Dialog content elements rendering */}
            <Grid
              item
              xs={12}
            >
              <Paper
                elevation={1}
              >
                <DialogScreenRenderer
                  classes={props.classes}
                  name={props.dialogScreen}
                  currentScreen={props.dialogScreen}
                  switchedOn={switchedOn}
                  handleSwitchChange={handleSwitchChange}
                  ddlData={props.ddlData}
                  gridList={props.dialogGridList}
                  buttonList={props.dialogButtonList}
                  fieldList={props.dialogFieldList}
                  msgList={props.dialogMsgList}
                  hiddenFields={props.dialogHiddenFields}
                  baseTemplates={props.baseTemplates}
                  buttonClickHandler={props.buttonClickHandler}
                  setItemValue={props.setItemValue}
                  dialog={true}
                // {...props}
                />
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

      </Dialog>
      {/* To leave space on top to prevent overlapping with Topbar */}
      {/* <div className={classes.toolbar} /> */}


    </div>
  );
}

export default connect(mapStateToProps, { setDialogScreenData, addToHeadCheckboxList })(DialogScreenPopUp);