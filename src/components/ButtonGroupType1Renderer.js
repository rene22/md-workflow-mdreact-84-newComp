import React from 'react';
import ButtonGroupRenderer from './ButtonGroupRenderer';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import { Grid, Card, CardContent } from '@material-ui/core';

function ButtonGroupType1Renderer(props) {
    const {classes} = props;
    return (
        <Grid item xs={12} lg={12}>
            <Card>
                <CardContent>
                    <ButtonGroupRenderer
                        items={props.buttonList.filter((button) => props.frame.buttons.indexOf(button.id) >= 0)} 
                        handler={props.buttonClickHandler}
                        {...props}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ButtonGroupType1Renderer;