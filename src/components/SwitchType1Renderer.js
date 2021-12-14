import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function SwitchType1Renderer(props) {
    const { classes } = props;
    const [label, setLabel] = useState('')

    useEffect(() => {
        if (props.switchedOn)
            setLabel('Hide Headers')
        else
            setLabel('Show Headers')
    })

    return (
        <Grid item xs={12} lg={12}>
            <Card>
                <CardContent>
                    <FormControlLabel className={classes.switchButton}
                        control={
                            <Switch checked={props.switchedOn} onChange={props.handleSwitchChange} />
                        }
                        label={label}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default SwitchType1Renderer;