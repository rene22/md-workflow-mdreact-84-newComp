
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnchorMenu from './AnchorMenu';
import { setTopbarData } from '../actions/TopbarActions';
import { Toolbar, Typography, AppBar, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import DialogRenderer from './DialogRenderer';
import logo from '../images/logo.png';

const mapStateToProps = (state) => {
  return {
    titleInfo: state.topbarReducer.titleInfo,
    subTitleInfo: state.topbarReducer.subTitleInfo,
    notificationInfo: state.topbarReducer.notificationInfo,
    accountInfo: state.topbarReducer.accountInfo,
    contactInfo: state.topbarReducer.contactInfo,
    DFDinfo: state.topbarReducer.DFDinfo,
    DFDdata: state.serverReducer.dfdData,
  };
};

function Topbar(props) {
  const { classes } = props;

  // const [open, setOpen] = React.useState(false);
  // const [dialogTitle, setDialogTitle] = React.useState("");
  // const [dialogContent, setDialogContent] = React.useState("");

  // const handleDialogOpen = (e) => {
  //   setDialogTitle(props.contactInfo.header);
  //   setDialogContent(props.contactInfo.content);
  //   setOpen(true);
  // };

  // const handleDialogClose = () => {
  //   setOpen(false);
  // };

  /* Rendering Topbar */
  return (
    <div id="topbar">
      <AppBar>

        <Toolbar className={classes.toolbar}>

          {/* Container for logo */}
          <Box
            className={classes.logoBox}>
            <img
              src={logo}
              alt='logo'
            />
          </Box>

          {/* Container for title and subtitle */}
          <Box
            className={classes.titleBox}
          >
            {props.titleInfo ?

              <Box>
                <Typography
                  variant="h5"
                  noWrap
                >
                  {props.titleInfo.value}
                </Typography>
              </Box>
              : ""
            }

            {props.subTitleInfo ? (
              <Box>
                <Typography
                  variant="caption"
                  noWrap
                >
                  {props.subTitleInfo.value}
                </Typography>
              </Box>
            ) : (
                ""
              )}
          </Box>

          {/* Flex Container in between to align the right side contents */}
          <Box
            className={classes.topbarBoxCenter}
          >

          </Box>

          {/* Container for notification and profile info */}
          <Box
            className={classes.profileBox}
          >
            {props.notificationInfo ?
              <Box>
                <AnchorMenu
                  key={props.notificationInfo.type}
                  item={props.notificationInfo}
                  {...props}
                />
              </Box>
              :
              ""
            }

            <Box>
              <IconButton
                aria-label="contact"
                id="contactInfo"
                className={classes.contactBtn}
                onClick={(e) => props.handleDialogOpen(e, props.contactInfo)}
              >
                <ContactSupportIcon />
              </IconButton>

              {/* {props.contactInfo ?
                <DialogRenderer
                  open={open}
                  dialogTitle={dialogTitle}
                  dialogContent={dialogContent}
                  handleDialogClose={handleDialogClose}
                  {...props}
                />
                :
                ""
              } */}
            </Box>

            {props.accountInfo ?
              <Box>
                <AnchorMenu
                  key={props.accountInfo.type}
                  item={props.accountInfo}
                  {...props}
                />
              </Box>
              :
              ""
            }
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(mapStateToProps, { setTopbarData })(Topbar);
