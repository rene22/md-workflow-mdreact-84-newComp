import React, { useEffect, useState } from 'react';
import FieldRenderer from './FieldRenderer';
import ButtonRenderer from './ButtonRenderer';
import DropdownRenderer from './DropdownRenderer'
import IconButtonRenderer from './IconButtonRenderer';
import { Grid, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

function PositionType1Renderer(props) {
    const { classes } = props;
    const [clear, setClear] = useState(false);
    const [enable, setEnable] = React.useState(props.checked);

    useEffect(() => {
        setEnable(props.checked);
    }, [props.checked])

    return (
        <Grid item xs={12} className={classes.positionTypeBG}>
            <Card className={classes.cardComponent}>
                <CardContent>
                    <span>
                        <IconButtonRenderer
                            item={{
                                id: 'POSITION'
                            }}
                            handler={props.buttonClickHandler}
                            icon={'POSITION'}
                            {...props}
                        />
                        {props.frame.fields ? props.fieldList.filter((field) => props.frame.fields.findIndex((fld) => fld.id === field.id) >= 0).map((field) => (
                            <FieldRenderer
                                key={field.id}
                                item={field}
                                attr={props.frame.fields.find((fld) => fld.id === field.id)}
                                handler={props.buttonClickHandler}
                                clear={clear}
                                setClear={setClear}
                                {...props}
                            />

                        )) : ''}
                    </span>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PositionType1Renderer;