import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export default function TransitionAlert(props) {
  const { classes } = props
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Collapse in={open}>
        <Alert
          variant="outlined"
          severity={
            (() => {
              switch (props.item.severity) {
                case '5':
                  return 'success'
                case '10':
                  return 'info'
                case '15':
                  return 'warning'
                case '20':
                  return 'error'
                case '30':
                  return 'error'
                case '40':
                  return 'error'
              }
            })()
          }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                props.resetMsgList()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        > {
            props.item.value === 'Entry Required' && props.item.fieldId && props.fieldList.length && props.fieldList.find((elem) => elem.id.search(props.item.fieldId) === 0) != undefined ?
              props.item.value + ' - ' + props.fieldList.find((elem) => elem.id.search(props.item.fieldId) === 0).label
              : props.gridList.length && props.gridList.find((grid) => {
                if (grid.rows.row && grid.rows.row.length)
                  return grid.rows.row.find((row) =>
                    row.item.find((elem) => props.item.fieldId && props.item.fieldId.search(elem.id) === 0))
                else
                  return
              }) != undefined ?
                props.item.value + ' - ' + props.gridList.find((grid) => {
                  return grid.rows.row.find((row) =>
                    row.item.find((elem) => props.item.fieldId.search(elem.id) === 0))
                }).header.item.find((head) => props.item.fieldId.search(head.id) === 0).value
                : props.item.value
          }
        </Alert>
      </Collapse>
    </div>
  );
}