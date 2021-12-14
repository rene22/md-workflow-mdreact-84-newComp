/** @format */

import React, { useState } from 'react';
import FieldRenderer from './FieldRenderer';
import { Grid, Card, CardContent } from '@material-ui/core';
import {
  getCalendarData,
  getAllDays,
  getCalendarDataWithEntries,
} from './calendarUtils';

function CalendarType1Renderer(props) {
  const { classes } = props;
  const [calendarData, setCalendarData] = useState(getCalendarData());
  var numOfCols = 0;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log('Ren data ', JSON.stringify(calendarData));
  console.log('week 22', calendarData[0].weekNr);
  calendarData.map((week) => console.log('week2', week.weekNr));

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
    <table style={{ minWidth: 800 }} aria-label='custom pagination table'>
      {calendarData.map((week, index) => (
        <>
          <thead>
            <tr>
              <th>Dessert 1 (return week.weekNr) </th>
              <th>Calories</th>
              <th>Fat</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td style={{ width: 160 }} align='right'>
                  {row.calories}
                </td>
                <td style={{ width: 160 }} align='right'>
                  {row.fat}
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} />
              </tr>
            )}
          </tbody>
        </>
      ))}
    </table>
  );
}

export default CalendarType1Renderer;
