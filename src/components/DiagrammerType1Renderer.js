import React from 'react';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';

function DiagrammerType1Renderer(props) {
    const {classes} = props;

    return (
        <Grid item xs={12} lg={12}>
            <Card>
                <CardContent>
                    {/* Render diagram */}
                </CardContent>
                <CardActions>
                    {/* Render actions if any */}
                </CardActions>
            </Card>
        </Grid>
    );
}

export default DiagrammerType1Renderer;