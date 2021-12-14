/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function CalendarFieldRenderer(props) {
  const { classes } = props;
  const { day } = props;

  function parseDate(str) {
    var y = str.substr(0, 4),
      m = str.substr(4, 2),
      d = str.substr(6, 2);

    return m + '/' + d + '/' + y;
    // var D = new Date(Date.UTC(y, m, d));
    // return (D.toLocaleDateString())
  }

  const dateFormatter = (str) => {
    return str;
  };

  return (
    <span>
      <TextField
        variant='outlined'
        label={'Rey'}
        id={'Rey'}
        key={'Rey'}
        value={'Rey'}
        onChange={(e) => handleChange(e)}
        error={'false'}
        helperText={'yupi'}
      />
      ;
    </span>
  );
}
