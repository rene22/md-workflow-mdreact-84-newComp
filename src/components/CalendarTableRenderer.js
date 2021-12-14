/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckBoxRenderer from './CheckBoxRenderer';
import Pagination from '@material-ui/lab/Pagination';
import CalendarFieldRenderer from './CalendarFieldRenderer';
import LinkRenderer from './LinkRenderer';
import ButtonRenderer from './ButtonRenderer';
import RadioButtonRenderer from './RadioButtonRenderer';
import IconButtonRenderer from './IconButtonRenderer';

export default function CalendarTableRenderer(props) {
  const { classes } = props;
  const [chkBoxVal, setChkBoxVal] = useState(false);
  const [headId, setHeadId] = useState('');

  const [radioVal, setRadioVal] = useState(null);

  const { calendarData } = props;
  console.log('calendar data', JSON.stringify(calendarData));

  const handleRadioChange = (event) => {
    setRadioVal(event.target.id);
  };

  const handlePageChange = (e, page) => {
    props.buttonClickHandler(props.item.id, page);
  };

  const handleHeadCheckboxClick = (e) => {
    if (props.headCheckboxList && props.headCheckboxList[e.target.id]) {
      setChkBoxVal(!props.headCheckboxList[e.target.id]);
    } else {
      setChkBoxVal(e.target.checked);
    }
    setHeadId(e.target.id.substring(0, e.target.id.search('Head')));
    props.addToHeadCheckboxList(e.target.id, e.target.checked);
  };

  function parseDate(str) {
    var y = str.substr(0, 4),
      m = str.substr(4, 2) - 1,
      d = str.substr(6, 2);

    var D = new Date(Date.UTC(y, m, d));
    return D.toLocaleDateString();
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader size='small' aria-label='customized table'>
          {calendarData.map((week, index) => (
            <>
              <TableHead>
                <TableRow>
                  {week.days.map((day) => (
                    <TableCell key={day.id} className={classes.headVAlign}>
                      <div>
                        <span>
                          <CalendarFieldRenderer
                            key={index}
                            day={day}
                            setItemValue={''}
                            handler={props.buttonClickHandler}
                            classes={classes}
                            isTableCell={true}
                            helperTextStyle={
                              props.helperTextStyle ? props.helperTextStyle : ''
                            }
                          />
                        </span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow key='22'>
                  {week.days.map((day, index) => (
                    <TableCell key='44'>
                      <span>
                        <CalendarFieldRenderer
                          day={day}
                          idx={day.id}
                          classes={classes}
                          isTableCell={true}
                          setItemValue={''}
                          helperTextStyle={
                            props.helperTextStyle ? props.helperTextStyle : ''
                          }
                        />
                        );
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </>
          ))}
        </Table>
      </TableContainer>
      {props.item.maxpages > 1 ? (
        <Pagination
          count={parseInt(props.item.maxpages)}
          page={parseInt(props.item.pagenr)}
          showFirstButton
          showLastButton
          onChange={(e, page) => handlePageChange(e, page)}
        />
      ) : (
        ''
      )}
    </div>
  );
}
