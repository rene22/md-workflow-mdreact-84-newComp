import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';

export default function RadioButtonRenderer(props) {
    return (
        <Radio
            id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
            checked={props.value === props.item.id + '(' + props.idx + ')'}
            onClick={() => props.handler(event)}
            value={props.value === props.item.id + '(' + props.idx + ')'}
            name="radio-button-demo"
            inputProps={{ 'aria-label': props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id }}
        />
    );
}