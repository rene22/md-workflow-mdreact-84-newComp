import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';

export default function LinkRenderer (props) {
    const { classes } = props;
    const [focus, setFocus] = useState('false');

    useEffect(() => {
        if (focus === 'true')
            props.handler(props.button ? props.button : 'SELECT')
    }, [focus])

    function handleClick(event) {
        if (props.action && document.getElementById(props.idx ? props.action.id + '(' + props.idx + ')' : props.action.id)) {
            document.getElementById(props.idx ? props.action.id + '(' + props.idx + ')' : props.action.id).value = props.action.value;
            props.handler('SELECT')
        }
        else 
            setFocus('true');
    }

    function parseDate(str) {
        var y = str.substr(0, 4),
            m = str.substr(4, 2) - 1,
            d = str.substr(6, 2);

        var D = new Date(Date.UTC(y, m, d));
        return (D.toLocaleDateString())
    }

    return (
        props.attr.fldTyp === 'D' ?
            <Link
                component="button"
                variant="body2"
                value={props.item.value}
                // value={parseDate(props.item.value.toString())}
                key={props.item.id}
                id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                // id={props.idx ? props.item.id + props.idx : props.item.id}
                onClick={handleClick}
                focussed={focus}
                actionid={props.action ? props.action.id : ''}
                actionval={props.action ? props.action.value : ''}
            >
                {parseDate(props.item.value.toString())}
            </Link>
            :
            <Link
                component="button"
                variant="body2"
                value={props.item.value}
                key={props.item.id}
                id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                // id={props.idx ? props.item.id + props.idx : props.item.id}
                onClick={handleClick}
                focussed={focus}
                actionid={props.action ? props.action.id : ''}
                actionval={props.action ? props.action.value : ''}
            >
                {props.item.value}
            </Link>
    );
}