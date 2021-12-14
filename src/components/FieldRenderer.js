import React, { Fragment, useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxRenderer from './CheckBoxRenderer';
import IconButtonRenderer from './IconButtonRenderer';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
// import moment from "moment";
// import {
//   MuiPickersUtilsProvider,
//   // TimePicker,
//   DatePicker
// } from "material-ui-pickers";
// import { setDate } from 'date-fns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

export default function FieldRenderer(props) {

  const classes = props.classes;
  const [val, setVal] = useState(props.item && props.item.value ?
    props.item.value :
    ''
  );

  useEffect(() => {
    if (props.clear) {
      props.setItemValue(props.item, '', props.idx)
      props.setClear(false)
    }
  })

  useEffect(() => {
    if (props.item.value != val) {
      setVal(props.item.value)
    }
  })

  function handleDateChange(date, value) {

    console.log('handleDateChange: ', value);

    delete props.item.error;
    window.pendingChanges = true

    var selectedDate = value.replace(/\//g, '');
    var y = selectedDate.substr(4, 4),
      m = selectedDate.substr(2, 2),
      d = selectedDate.substr(0, 2);

    console.log(y + m + d);

    setVal(y + m + d)
    props.setItemValue(props.item, y + m + d, props.idx)
  }

  function handleChange(e) {
    delete props.item.error;
    window.pendingChanges = true
    props.setItemValue(props.item, e.target.value, props.idx)
  }

  function parseDate(str) {
    var y = str.substr(0, 4),
      m = str.substr(4, 2),
      d = str.substr(6, 2);

    return (m + "/" + d + "/" + y)
    // var D = new Date(Date.UTC(y, m, d));
    // return (D.toLocaleDateString())
  }

  const dateFormatter = (str) => {
    return str;
  };


  return (
    props.item ?
      props.item.visible === 'false' ?
        <TextField className={classes.hiddenField}
          id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
          value={props.item.value}
          key={props.item.id}
          disabled={!props.item.editable}
        />
        :
        <span>
          {(() => {
            switch (props.attr.fldTyp) {
              case 'B':
                if (props.item.editable && props.item.editable === 'true') {
                  return (
                    <CheckBoxRenderer
                      item={props.item}
                      idx={props.idx}
                      defaultVal={props.defaultVal ? props.defaultVal : ''}
                      headId={props.headId ? props.headId : ''}
                      setItemValue={props.setItemValue}
                      classes={classes}
                    >
                    </CheckBoxRenderer>
                  )
                }
                else {
                  return (
                    <CheckBoxRenderer
                      item={props.item}
                      idx={props.idx}
                      disabled={true}
                      setItemValue={props.setItemValue}
                      classes={classes}
                    >
                    </CheckBoxRenderer>
                  )
                }
                break;

              case 'D':


                if (props.item.editable && props.item.editable === 'true')
                  return (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        autoOk={true}
                        clearable
                        variant="inline"
                        inputVariant="outlined"
                        label={props.item.label ? props.item.label : props.label ? props.label : ''}
                        id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                        key={props.item.id}
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        // rifmFormatter={dateFormatter}
                        value={props.item.value && props.item.value != 0 ? new Date(parseDate(val)) : null}
                        InputAdornmentProps={{ position: "end" }}
                        className={props.isTableCell ? classes.tableDatePicker : ''}
                        onChange={(date, value) => handleDateChange(date, value)}
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
                                    return (
                                      props.attr.fldLen * 20
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
                        // error={props.item.error != undefined && props.item.error === 'true'}
                        // helperText={props.item.error != undefined && props.item.error === 'true' ? 'Error' : ''}
                        FormHelperTextProps={{
                          className: props.helperTextStyle ? props.helperTextStyle
                            : props.helperTextActionComp ? props.helperTextActionComp
                              : {}
                        }}
                        inputProps={{
                          isDate: "true"
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  )
                else
                  return (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        disabled
                        autoOk={true}
                        variant="inline"
                        inputVariant="outlined"
                        label={props.item.label ? props.item.label : props.label ? props.label : ''}
                        id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                        key={props.item.id}
                        placeholder="DD/MM/YYYY"
                        format="DD/MM/YYYY"
                        // rifmFormatter={dateFormatter}
                        value={props.item.value && props.item.value != 0 ? new Date(parseDate(val)) : null}
                        InputAdornmentProps={{ position: "end" }}
                        onChange={(date, value) => handleDateChange(date, value)}
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
                                    return (
                                      props.attr.fldLen * 20
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
                        // error={props.item.error != undefined && props.item.error === 'true'}
                        // helperText={props.item.error != undefined && props.item.error === 'true' ? 'Error' : ''}
                        FormHelperTextProps={{
                          className: props.helperTextStyle ? props.helperTextStyle
                            : props.helperTextActionComp ? props.helperTextActionComp
                              : {}
                        }}
                        inputProps={{
                          isDate: "true"
                        }}
                      />
                    </MuiPickersUtilsProvider>

                  )
                break;
              // case 'D':
              //   if (props.item.editable && props.item.editable === 'true') {
              //     return (
              //       <LocalizationProvider dateAdapter={AdapterDateFns}>
              //         <DesktopDatePicker
              //           label="Date desktop"
              //           inputFormat="MM/dd/yyyy"
              //           value={val}
              //           onChange={handleChange}
              //           renderInput={
              //             (params) =>
              //               <TextField
              //                 variant="outlined"
              //                 label={props.item.label ? props.item.label : props.label ? props.label : ''}
              //                 id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
              //                 key={props.item.id}
              //                 error={props.item.error != undefined && props.item.error === 'true'}
              //                 helperText={props.item.error != undefined && props.item.error === 'true' ? 'Error' : ''}
              //                 FormHelperTextProps={{
              //                   className: props.helperTextStyle ? props.helperTextStyle
              //                     : props.helperTextActionComp ? props.helperTextActionComp
              //                       : {}
              //                 }}
              //                 inputProps={{
              //                   maxLength: props.attr.fldLen,
              //                 }}
              //                 {...params}
              //               />
              //           }
              //         />
              //       </LocalizationProvider>
              //     )
              //   }
              //   else {
              //     return (
              //       <TextField
              //         variant="outlined"
              //         label={props.item.label ? props.item.label : props.label ? props.label : ''}
              //         id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
              //         key={props.item.id}
              //         value={parseDate(val.toString())}
              //         onChange={(e) => handleChange(e)}
              //         error={props.item.error != undefined && props.item.error === 'true'}
              //         helperText={props.item.error != undefined && props.item.error === 'true' ? 'Error' : ''}
              //         FormHelperTextProps={{
              //           className: props.helperTextStyle ? props.helperTextStyle
              //             : props.helperTextActionComp ? props.helperTextActionComp
              //               : {}
              //         }}
              //         inputProps={{
              //           maxLength: props.attr.fldLen,
              //         }}
              //       />
              //     )
              //   }

              default:
                if (props.item.editable === 'true' && props.item.browse && props.item.browse === "true") {
                  return (
                    <TextField
                      variant="outlined"
                      label={props.item.label ? props.item.label : props.label ? props.label : ''}
                      id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                      key={props.item.id}
                      value={val}
                      onChange={(e) => handleChange(e)}
                      error={props.item.error != undefined && props.item.error === 'true'}
                      helperText={props.item.error != undefined && props.item.error === 'true' ? 'Error' : ''}
                      FormHelperTextProps={{
                        className: props.helperTextStyle ? props.helperTextStyle
                          : props.helperTextActionComp ? props.helperTextActionComp
                            : {}
                      }}
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
                                  return (
                                    props.attr.fldLen * 20
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
                      inputProps={{
                        maxLength: props.attr && props.attr.fldLen ? props.attr.fldLen : ''
                      }}
                      InputProps={{
                        endAdornment:
                          <InputAdornment position='end'>
                            <IconButtonRenderer
                              item={props.item}
                              idx={props.idx}
                              icon={'BROWSE'}
                              {...props}
                            />
                          </InputAdornment>
                      }}
                    />
                  )
                }
                else if (props.item.editable === 'true') {
                  return (
                    <TextField
                      variant="outlined"
                      label={props.item.label ? props.item.label : props.label ? props.label : ''}
                      id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                      key={props.item.id}
                      value={val}
                      onChange={(e) => handleChange(e)}
                      className={props.isTableCell ? classes.tableTextField : ''}
                      error={props.item.error != undefined && props.item.error === 'true'}
                      helperText={props.item.error != undefined && props.item.error === 'true' ? 'Error' : ''}
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
                                  return (
                                    props.attr.fldLen * 20
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
                      inputProps={{
                        maxLength: props.attr && props.attr.fldLen ? props.attr.fldLen : '',
                      }}
                      FormHelperTextProps={{
                        className: props.helperTextStyle ? props.helperTextStyle
                          : props.helperTextActionComp ? props.helperTextActionComp
                            : {}
                      }}
                    />
                  )
                }
                else {
                  return (
                    <TextField
                      disabled
                      variant="outlined"
                      label={props.item.label}
                      id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                      key={props.item.id}
                      value={val}
                      // value={props.item.value}
                      className={classes.disabledField}
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
                                  return (
                                    props.attr.fldLen * 20
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
                    />
                  )
                }
                break;
            }
          })()}
        </span>
      :
      ''
  );
}