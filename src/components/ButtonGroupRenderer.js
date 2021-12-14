import React from 'react';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button, ButtonGroup } from '@material-ui/core';

export default function ButtonGroupRenderer(props) {
  const { classes } = props;
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      {props.items.map((button) => (
        button.value || (button.md_content && button.md_content.value) ?
          <Button
            variant="contained"
            color="primary"
            id={button.id}
            onClick={() => props.handler(button.id)}
            className={classes.buttonGroupBtn}
            key={button.id}
          >
            {button.value ? button.value : button.md_content.value}
          </Button>
          : ''
      ))}
    </ButtonGroup>
  )
}