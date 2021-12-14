/** @format */

import React from 'react';
import FieldRenderer from './FieldRenderer';
import { Grid, Card, CardContent } from '@material-ui/core';
import {
  getCalendarData,
  getAllDays,
  getCalendarDataWithEntries,
} from './calendarUtils';

function CalendarType1RendererSave(props) {
  const { classes } = props;
  const [calendarData, setCalendarData] = useState({getCalendarData()});
  var numOfCols = 0;

  props.gridList
    .filter((table) => props.frame.tableID === table.id)
    .forEach((table) =>
      table.rows.row.forEach((row, idx1) => {
        row.item.forEach((col, idx2) => {
          if (!(col.visible && col.visible === 'false') && idx1 === 0)
            numOfCols++;
        });
      })
    );

  return (
    <Grid item xs={12} lg={12} className={classes.updTabGridParent}>
      {/* <Card className={classes.updTabCard}> */}
      <Card>
        <CardContent className={classes.updatableTableCardContent}>
          {props.gridList
            .filter((table) => props.frame.tableID === table.id)
            .map((table) =>
              table.rows.row.map((row, idx1) => (
                <Grid
                  container
                  key={table.id + idx1}
                  className={classes.updatableTableGridRow}
                >
                  {row.item.map((col, idx2) =>
                    col.visible && col.visible === 'false' ? (
                      <FieldRenderer
                        key={col.id + idx1 + idx2}
                        idx={idx1 + 1}
                        item={Object.assign(col, {
                          label: table.header.item[idx2].value,
                        })}
                        attr={props.frame.fields.find(
                          (fld) => fld.id === col.id
                        )}
                        setItemValue={props.setItemValue}
                        classes={props.classes}
                      />
                    ) : (
                      // <Grid item xs={12} lg={Math.floor(12/numOfCols)} className={classes.updTabGridItem} key={table.id + idx1 + idx2}>
                      <Grid
                        item
                        className={classes.updTabGridItem}
                        key={table.id + idx1 + idx2}
                      >
                        <FieldRenderer
                          key={col.id + idx1 + idx2}
                          idx={idx1 + 1}
                          item={Object.assign(col, {
                            label: table.header.item[idx2].value,
                          })}
                          attr={props.frame.fields.find(
                            (fld) => fld.id === col.id
                          )}
                          setItemValue={props.setItemValue}
                          classes={props.classes}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              ))
            )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CalendarType1RendererSave;
