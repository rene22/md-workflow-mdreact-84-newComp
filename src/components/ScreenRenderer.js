import React, { useEffect } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Maincontent from "./MainContent";
import Footer from "./Footer";
// import DialogScreenPopUp from "./DialogScreenPopup";
import DialogRenderer from "./DialogRenderer";

function ScreenRenderer(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(true);
  // const [dialogScreenOpen, setDialogScreenOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogAction, setDialogAction] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleScreenDialogClose = () => {
  //   setDialogScreenOpen(false);
  // };

  const handleDialogOpen = (e, data) => {
    props.setDialogPopUp(data);
    setDialogTitle(data.header);
    setDialogContent(data.content);
    setDialogAction(data.action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    props.setDialogPopUp(null)
    setDialogTitle('');
    setDialogContent('');
    setDialogAction('');
  };

  // useEffect(() => {
  //   if (props.dialogBoxResp)
  //     setDialogScreenOpen(true);
  // }, [props.dialogBoxResp])

  useEffect(() => {
    if (props.dialogPopUp != null && typeof (props.dialogPopUp) === 'object' && Object.keys(props.dialogPopUp).length != 0) {
      setDialogTitle(props.dialogPopUp.header);
      setDialogContent(props.dialogPopUp.content);
      setDialogAction(props.dialogPopUp.action);
      setDialogOpen(true);
    }
  }, [props.dialogPopUp])

  return (
    <div
      id={"license-application-" + props.currentScreen}
      className={classes.root}
    >
      <Topbar
        handleDialogOpen={handleDialogOpen}
        {...props}
      />

      <Sidebar
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        {...props}
      />

      <Maincontent
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        {...props}
      />

      {/* <DialogScreenPopUp
        handleScreenDialogClose={handleScreenDialogClose}
        dialogScreenOpen={dialogScreenOpen}
        {...props}
      /> */}

      {dialogOpen ?
        <DialogRenderer
          open={dialogOpen}
          dialogTitle={dialogTitle}
          dialogContent={dialogContent}
          dialogAction={dialogAction}
          handler={props.buttonClickHandler}
          handleDialogClose={handleDialogClose}
          {...props}
        />
        : ''
      }

      <Footer
        {...props}
      />
    </div>
  );
}

export default ScreenRenderer;
