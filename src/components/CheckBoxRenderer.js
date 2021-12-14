import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

export default function CheckBoxRenderer(props) {
  const { classes } = props;
  const [val, setVal] = useState(props.item.value && props.item.value === 'true' ? true : false);


  useEffect(() => {
    if (props.item.id && props.item.id.search('Head') < 0)
      setVal(props.item.value && props.item.value === 'true' ? true : false)
  })

  function handleChange(event, isInputChecked) {
    window.pendingChanges = true
    props.setItemValue(props.item, `${isInputChecked}`, props.idx)

    if (props.item.id && props.item.id.search('Head') > 0)
      setVal(isInputChecked)
  }

  return (
    props.isTableCell ?
      <Checkbox
        checked={val}
        disabled={props.disabled ? true : false}
        color="primary"
        key={props.item.id}
        id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
        onChange={handleChange}
        value={val}
        onClick={props.onClick ? props.onClick : ''}
      />
      :
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              className={classes.iconButtonWithLabel}
              checked={val}
              disabled={props.disabled ? true : false}
              color="primary"
              key={props.item.id}
              id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
              onChange={handleChange}
              value={val}
              onClick={props.onClick ? props.onClick : ''}
              labelPlacement="end"
            />
          }
          label={props.item.label} />
      </FormGroup>

  );
}