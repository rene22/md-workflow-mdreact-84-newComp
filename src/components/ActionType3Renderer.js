import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import { Grid, Card, CardActions, Link } from '@material-ui/core';

function ActionType3Renderer(props) {
    const {classes} = props;
    
    return (
        <Grid item xs={12} lg={12}>
            <Card>
                <CardActions className={classes.linkAlign}>
                    {props.frame.buttons ? props.buttonList.filter((button) => props.frame.buttons.indexOf(button.id) >= 0).map((button) => (
                        <Link
                            key={button.id}
                            component="button"
                            variant="body2"
                            onClick={(e) => {
                                props.linkClickHandler(button.id)
                            }}
                            >
                            {button.value}
                        </Link>
                    )) : ''}
                </CardActions>
            </Card>
        </Grid>
    );
}

export default ActionType3Renderer;