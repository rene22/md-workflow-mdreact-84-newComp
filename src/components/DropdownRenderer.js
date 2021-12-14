import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Typography, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import { fetchDdlList } from '../actions/ServerActions';
import FormHelperText from '@material-ui/core/FormHelperText';

function DropdownRenderer(props) {
    const { classes } = props;
    const [value, setVal] = useState(props.item && props.item.value ? props.item.value : '');

    const ddlValues = []

    if (props.ddlData[props.ddlCode] && props.ddlData[props.ddlCode].item && Array.isArray(props.ddlData[props.ddlCode].item))
        props.ddlData[props.ddlCode].item.forEach((item) => {
            ddlValues.push(item.value.length);
        })

    useEffect(() => {
        setVal(props.item.value)
    })

    useEffect(() => {
        if (props.clear) {
            props.setItemValue(props.item, '', props.idx)
            props.setClear(false)
        }
    })

    function handleChange(target) {
        delete props.item.error;
        props.setItemValue(props.item, target.value, props.idx)
    }

    return (
        props.item && props.item.editable && props.item.editable === 'true' ?
            <FormControl
                variant="outlined"
                error={props.item.error != undefined && props.item.error === 'true'}
                style={{
                    width:
                        `${(() => {
                            switch (true) {
                                case props.item.label != undefined && ddlValues.length > 0:
                                    if (props.item.label.length > Math.max(...ddlValues))
                                        return (
                                            props.item.label.length * 15
                                        )
                                    else
                                        return (
                                            Math.max(...ddlValues) * 15
                                        )
                                case props.item.label === undefined && ddlValues.length > 0:
                                    return (
                                        Math.max(...ddlValues) * 15
                                    )
                                case props.item.label != undefined && ddlValues.length === 0:
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
                <InputLabel>{props.item.label}</InputLabel>
                <Select
                    autoWidth={true}
                    labelId={props.item.id}
                    label={props.item.label}
                    id={props.item.id}
                    value={value}
                    onChange={e => handleChange(e.target)}
                >
                    {
                        props.ddlData[props.ddlCode] && props.ddlData[props.ddlCode].item && Array.isArray(props.ddlData[props.ddlCode].item)?
                            props.ddlData[props.ddlCode].item.map((val) => (
                                typeof (val) === 'object' ?
                                    <MenuItem value={val.code ? val.code : val.key1} key={val.code ? val.code : val.key1}>{
                                        (() => {
                                            switch (props.ddlData[props.ddlCode].view) {
                                                case 'code':
                                                    return val.code
                                                case 'value':
                                                    return val.value
                                                case 'code-value':
                                                    return (val.code + ' - ' + val.value)
                                            }
                                        })()
                                    }</MenuItem>
                                    : <MenuItem value={val} key={val}>{val}</MenuItem>
                            ))
                            : ''}
                </Select>
                {props.item.error != undefined && props.item.error === 'true' ?
                    <FormHelperText
                        className={props.helperTextStyle ? props.helperTextStyle
                            : props.helperTextActionComp ? props.helperTextActionComp
                                : ''}
                    >
                        Error
                        </FormHelperText>
                    : ''}
            </FormControl>
            :
            props.item && props.item.editable && props.item.editable === 'false' ?
                <FormControl
                    disabled
                    variant="outlined"
                    style={{
                        width:
                            `${(() => {
                                switch (true) {
                                    case props.item.label != undefined && ddlValues.length > 0:
                                        if (props.item.label.length > Math.max(...ddlValues))
                                            return (
                                                props.item.label.length * 15
                                            )
                                        else
                                            return (
                                                Math.max(...ddlValues) * 15
                                            )
                                    case props.item.label === undefined && ddlValues.length > 0:
                                        return (
                                            Math.max(...ddlValues) * 15
                                        )
                                    case props.item.label != undefined && ddlValues.length === 0:
                                        return (
                                            props.item.label.length * 15
                                        )
                                    default:
                                        return (
                                            ''
                                        )
                                }
                            })()}px`,
                    }}
                    className={classes.disabledField}
                >
                    <InputLabel>{props.item.label}</InputLabel>
                    <Select
                        autoWidth={true}
                        labelId={props.item.id}
                        label={props.item.label}
                        id={props.item.id}
                        value={value}
                        onChange={e => handleChange(e.target)}
                    >
                        {
                            props.ddlData[props.ddlCode] && props.ddlData[props.ddlCode].item ?
                                props.ddlData[props.ddlCode].item.map((val) => (
                                    typeof (val) === 'object' ?
                                        <MenuItem value={val.code ? val.code : val.key1} key={val.code ? val.code : val.key1}>{
                                            (() => {
                                                switch (props.ddlData[props.ddlCode].view) {
                                                    case 'code':
                                                        return val.code
                                                    case 'value':
                                                        return val.value
                                                    case 'code-value':
                                                        return (val.code + ' - ' + val.value)
                                                }
                                            })()
                                        }</MenuItem>
                                        : <MenuItem value={val} key={val}>{val}</MenuItem>
                                ))
                                : ''}
                    </Select>
                </FormControl>
                : ''
    )
}

export default connect(null, { fetchDdlList })(DropdownRenderer);