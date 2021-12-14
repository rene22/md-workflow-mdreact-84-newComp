import React, { useState, useEffect } from 'react';
import PostAdd from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';

export default function IconButtonRenderer(props) {
    const { classes } = props;
    const [focus, setFocus] = useState('false');

    useEffect(() => {
        if (focus === 'true') {
            props.handler(props.icon);
            setFocus('false');
        }
    }, [focus])

    function handleClick(event) {
        document.getElementById(props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id)
            .setAttribute('focussed', 'true');
        setFocus('true');
    }

    return (
        props.icon === 'DELETE' ?
            <IconButton>
                <DeleteIcon fontSize='small'
                    key={props.item.id}
                    id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                    onClick={handleClick}
                    // focussed={focus}
                    focus={focus}
                />
            </IconButton>
            : props.icon === 'EXTEND' ?
                <IconButton>
                    <PostAdd fontSize='small'
                        key={props.item.id}
                        id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                        onClick={handleClick}
                        focus={focus}
                    // focussed={focus}
                    />
                </IconButton>
                : props.icon === 'POSITION' ?
                    <IconButton>
                        <KeyboardTabIcon fontSize='large'
                            key={props.item.id}
                            id={props.idx ? props.item.id + '(' + props.idx + ')' : props.item.id}
                            onClick={handleClick}
                            focus={focus}
                            className={classes.positionButton}
                        // focussed={focus}
                        />
                    </IconButton>
                    : props.icon === 'BROWSE' ?
                        <IconButton>
                            <SearchIcon
                                key={props.item.id}
                                id={props.idx ? props.item.id + '(' + props.idx + ')BROWSE' : props.item.id + 'BROWSE'}
                                // onClick={() => props.handler(props.idx ? props.item.id + '(' + props.idx + ')BROWSE' : props.item.id + 'BROWSE')}
                                onClick={handleClick}
                                focus={focus}
                            />
                        </IconButton>
                        : ''
    );
}