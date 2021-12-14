import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

export default function DialogRenderer(props) {

  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useEffect(() => {
      setOpen(props.open)
  }, [props.open])

  const handleClick = (action) => {
    props.handleDialogClose();

    if (action.localeCompare('Dismiss') != 0)
      props.handler(action);
  };

  return (
    /* Dialog box rendering for menu options click */
    <Dialog
      onClose={props.handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"lg"}
      className={classes.contactCard}
    >
      <MuiDialogTitle disableTypography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={props.handleDialogClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>

      <DialogTitle
        id="customized-dialog-title"
        onClose={props.handleDialogClose}
      >
        {props.dialogTitle ? props.dialogTitle : ''}
      </DialogTitle>

      <DialogContent dividers>
        {props.dialogContent && typeof (props.dialogContent) === 'object' ?
          Object.keys(props.dialogContent).map((attr, idx) =>
            <span>
              {(() => {
                switch (true) {
                  case attr === 'url':
                    return (
                      <Link href="#" onClick={() => openInNewTab(props.dialogContent.url)}>
                        {props.dialogContent.url}<br /><br />
                      </Link>
                    )
                  case idx + 1 === Object.keys(props.dialogContent).length:
                    return (
                      <div>
                        {props.dialogContent[attr]}
                      </div>
                    )
                  default:
                    return (
                      <div>
                        {props.dialogContent[attr]}<br /><br />
                      </div>
                    )
                }
              })()}
            </span>
          )
          :
          props.dialogContent
        }
      </DialogContent>
      {props.dialogAction ?
        <DialogActions>
          <Button autoFocus onClick={() => handleClick(props.dialogAction)} color="primary">
            {props.dialogAction}
          </Button>
        </DialogActions>
        : ''
      }

    </Dialog>
  );
}