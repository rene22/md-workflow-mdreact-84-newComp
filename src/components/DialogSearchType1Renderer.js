import React, { useEffect, useState } from 'react';
import FieldRenderer from './FieldRenderer';
import ButtonRenderer from './ButtonRenderer';
import DropdownRenderer from './DropdownRenderer'
import { Grid, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

function DialogSearchType1Renderer(props) {
    const { classes } = props;
    const [clear, setClear] = useState(false);
    const [enable, setEnable] = React.useState(props.checked);

    useEffect(() => {
        setEnable(props.checked);
    }, [props.checked])

    return (
        <Grid item xs={12} lg={6}>
            <Card className={classes.cardComponent}>
            {/* <Card> */}
                <CardContent>
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
                    {props.frame.dropdowns ? props.fieldList.filter((field) => props.frame.dropdowns.indexOf(field.id) >= 0).map((field) => (
                        <DropdownRenderer
                            key={field.id}
                            item={field}
                            ddlCode={field.id}
                            clear={clear}
                            setClear={setClear}
                            {...props}
                        />
                    )) : ''}
                </CardContent>
                <CardActions>
                    {props.frame.buttons && props.buttonList && props.frame.buttons.find((button) => props.buttonList.indexOf(button.id) < 0 && button === 'CLEAR') != undefined ?
                        <ButtonRenderer
                            key={props.frame.buttons.find((button) => props.buttonList.indexOf(button.id) < 0 && button === 'CLEAR')}
                            item={{
                                id: "CLEAR"
                            }}
                            action={{
                                frame: props.frame.id
                            }}
                            setClear={setClear}
                            {...props}
                        />
                        : ''}
                    {props.buttonList && props.buttonList.filter((button) => props.frame.buttons.indexOf(button.id) >= 0).map((button) => (
                        <ButtonRenderer
                            key={button.id}
                            item={button}
                            handler={props.buttonClickHandler}
                            {...props}
                        />
                    ))}
                </CardActions>
            </Card>
        </Grid>
    );
}

export default DialogSearchType1Renderer;


