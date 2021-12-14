import React from 'react';
import { connect } from 'react-redux';
import TableRenderer from './TableRenderer';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { setComponentEnabled } from '../actions/MainContentActions';
import { Grid, Card, CardContent, CardActions, CardHeader, IconButton, Menu, MenuItem } from '@material-ui/core';

function TableType2Renderer(props) {
    const { classes } = props;
    // const ITEM_HEIGHT = 48;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (action) => {
        setAnchorEl(null);
        props.setComponentEnabled(action.frame)
    };

    return (
        <Grid item xs={12} lg={6}>
            <Card>
                {props.frame.title ?
                    <CardHeader
                        title={props.frame.title && props.fieldList.length && props.fieldList.find((field) => props.frame.title.id === field.id).label ?
                            props.fieldList.find((field) => props.frame.title.id === field.id).label + ' : ' + props.fieldList.find((field) => props.frame.title.id === field.id).value
                            : ''}
                        // action={
                        //     <div>
                        //         <IconButton
                        //             aria-label="settings"
                        //             onClick={handleClick}
                        //         >
                        //             <MoreVertIcon />
                        //         </IconButton>
                        //         <Menu
                        //             id="long-menu"
                        //             anchorEl={anchorEl}
                        //             keepMounted
                        //             open={open}
                        //             onClose={handleClose}
                        //         >
                        //             {props.frame.actions.map((action) => (
                        //                 <MenuItem key={action.name} onClick={() => handleClose(action)}>
                        //                     {action.name}
                        //                 </MenuItem>
                        //             ))}
                        //         </Menu>
                        //     </div>
                        // }
                    />
                    : ''}
                <CardContent className={classes.tableCardContent}>
                    {/* {props.gridList.filter((table) => props.frame.tables.indexOf(table.id) >= 0).map((table) => ( */}
                    {props.gridList.filter((table) => props.frame.tableID === table.id).map((table) => (
                        <TableRenderer
                            key={table.id}
                            item={table}
                            hiddenFields={props.hiddenFields}
                            colType={props.frame.colType}
                            fldDdlMap={props.frame.fldDdlMap ? props.frame.fldDdlMap : null}
                            handler={props.buttonClickHandler}
                            {...props}
                        />
                    ))}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default connect(null, { setComponentEnabled })(TableType2Renderer);