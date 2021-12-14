/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import CalendarTableRenderer from './CalendarTableRenderer';
import TableRenderer from './TableRenderer';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { setComponentEnabled } from '../actions/MainContentActions';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { getCalendarData } from './calendarUtils';

function TableType3Renderer(props) {
  const { classes } = props;
  // const ITEM_HEIGHT = 48;
  const [calendarData, setCalendarData] = useState(getCalendarData());

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    props.setComponentEnabled(action.frame);
  };

  console.log('Ren data ', JSON.stringify(calendarData));
  console.log('week 22', calendarData[0].weekNr);
  calendarData.map((week) => console.log('week2', week.weekNr));

  return (
    <Grid item xs={12} lg={12}>
      <Card>
        {props.frame.title ? (
          <CardHeader
            title={
              props.frame.title &&
              props.fieldList.length &&
              props.fieldList.find((field) => props.frame.title.id === field.id)
                .label
                ? props.fieldList.find(
                    (field) => props.frame.title.id === field.id
                  ).label +
                  ' : ' +
                  props.fieldList.find(
                    (field) => props.frame.title.id === field.id
                  ).value
                : ''
            }
          />
        ) : (
          ''
        )}
        <CardContent className={classes.tableCardContent}>
          {props.gridList
            .filter((table) => props.frame.tableID === table.id)
            .map((table) => (
              <CalendarTableRenderer
                key={table.id}
                item={table}
                hiddenFields={props.hiddenFields}
                colType={props.frame.colType}
                fldDdlMap={props.frame.fldDdlMap ? props.frame.fldDdlMap : null}
                handler={props.buttonClickHandler}
                calendarData={calendarData}
                {...props}
              />
            ))}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default connect(null, { setComponentEnabled })(TableType3Renderer);
