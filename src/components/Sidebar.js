import React, { useEffect } from "react";
import Links from "./Links";
import CardComponent from "./CardComponent";
import { connect } from "react-redux";
import { Drawer, Box, IconButton } from "@material-ui/core";
import { setSidebarData } from "../actions/SidebarActions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const mapStateToProps = (state) => {
  return {
    header: state.sidebarReducer.header,
    links: state.sidebarReducer.links,
    dfdlinks: state.sidebarReducer.dfdlinks
  };
};

function Sidebar(props) {
  const { classes } = props;

  /* Update the sidebar data as soon as the new page is read */
  useEffect(() => {
    if (props.pageResp) props.setSidebarData(props.pageResp);
  }, [props.pageResp]);

  useEffect(() => {
    if (props.links && props.baseTemplates[props.currentScreen] &&
      props.baseTemplates[props.currentScreen].links)
      props.handleDrawerOpen()
    else
      props.handleDrawerClose()
  }, [props.links, props.baseTemplates[props.currentScreen]])

  /* Rendering sidebar component */
  return (
    <div id="sidebar">
      <Drawer variant="persistent" open={props.open}>
        {/* To leave space on top to prevent overlapping with Topbar */}
        <div className={classes.toolbar} />

        {/* Icon to close the sidebar drawer */}
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose} className={classes.sidebarCollapseIcon}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        {/* Container for the sidebar components */}
        <Box className={classes.drawerContainer} >
          {/* Container for Links */}
          <Box>
            {props.baseTemplates[props.currentScreen] &&
              props.baseTemplates[props.currentScreen].links ?
              <Links
                subHeader={props.header}
                links={props.links}
                handler={props.linkClickHandler}
                {...props}
              />
              :
              ''
            }
          </Box>

          {/* 
          <Box className={classes.sidebarFlexBox}/>

          Container for static contact card 
          <Box>
            <CardComponent card={props.contactInfo} {...props}/>
          </Box>
          */}
        </Box>
      </Drawer>
    </div>
  );
}

export default connect(mapStateToProps, { setSidebarData })(Sidebar);
