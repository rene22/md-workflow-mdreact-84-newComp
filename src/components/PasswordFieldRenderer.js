import React from 'react';
import { Typography, OutlinedInput, TextField, InputAdornment, FormControl, IconButton, Grid, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function PasswordFieldRenderer(props) {
  const { classes } = props;

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    props.item ?
      props.item.visible && props.item.visible === 'false' ?
        <TextField
          className={classes.hiddenField}
          id={props.item.id}
          key={props.item.id}
          disabled={!props.item.editable}
        />
        :
        props.item.editable === 'true' ?
          <FormControl variant="outlined"
            style={{
              width:
                `${(() => {
                  switch (true) {
                    case props.item.label != undefined && props.attr != undefined:
                      if (props.item.label.length > props.attr.fldLen)
                        return (
                          props.item.label.length * 15
                        )
                      else
                        if (props.isTableCell)
                          return (
                            props.attr.fldLen * 20
                          )
                        else
                          return (
                            props.attr.fldLen * 15
                          )
                    case props.item.label === undefined && props.attr != undefined:
                      if (props.isTableCell)
                        return (
                          props.attr.fldLen * 20
                        )
                      else
                        return (
                          props.attr.fldLen * 15
                        )
                    case props.item.label != undefined && props.attr === undefined:
                      return (
                        props.item.label.length * 15
                      )
                    default:
                      return (
                        ''
                      )
                  }
                })()}px`
            }}
          >
            <InputLabel htmlFor={props.item.id}>Password</InputLabel>
            <OutlinedInput
              id={props.item.id}
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
              inputProps={{
                maxLength: props.attr.fldLen,
              }}
            />
          </FormControl>
          :
          <span>
            <Typography style={{ fontSize: '1.25rem', fontWeight: '600', margin: '8px' }}>
              {props.item.label} : {props.item.value}
            </Typography>
          </span>
      :
      ''
  );
}