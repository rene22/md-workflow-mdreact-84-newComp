import React from 'react';
import FieldRenderer from './FieldRenderer';
import ButtonRenderer from './ButtonRenderer';
import DropdownRenderer from './DropdownRenderer';
import PasswordFieldRenderer from './PasswordFieldRenderer';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';

function ActionType2Renderer(props) {
    const { classes } = props;

    return (
        <Grid item xs={12} lg={4}>
            <Card className={classes.cardComponent}>
                <CardContent>
                    {props.frame.fields ? props.fieldList.filter((field) => props.frame.fields.findIndex((fld) => fld.id === field.id) >= 0)
                        .sort(function (a, b) {
                            return props.frame.fields.findIndex((fld) => fld.id === a.id) - props.frame.fields.findIndex((fld) => fld.id === b.id);
                        })
                        .map((field) => (
                            field.id === 'PASSWORD' ?
                                <PasswordFieldRenderer
                                    key={field.id}
                                    item={field}
                                    attr={props.frame.fields.find((fld) => fld.id === field.id)}
                                    // enterKeyAction={props.frame.buttons ? props.frame.buttons[0] : null}
                                    handler={props.buttonClickHandler}
                                    {...props}
                                />
                                :
                                <FieldRenderer
                                    key={field.id}
                                    item={field}
                                    attr={props.frame.fields.find((fld) => fld.id === field.id)}
                                    handler={props.buttonClickHandler}
                                    {...props}
                                />
                        )) : ''}
                    {props.frame.dropdowns ? props.fieldList.filter((field) => props.frame.dropdowns.indexOf(field.id) >= 0).map((field) => (
                        <DropdownRenderer
                            key={field.id}
                            item={field}
                            ddlCode={field.id}
                            {...props}
                        />
                    )) : ''}
                </CardContent>
                <CardActions>
                    {props.frame.buttons ? props.buttonList.filter((button) => props.frame.buttons.indexOf(button.id) >= 0).map((button) => (
                        <ButtonRenderer
                            key={button.id}
                            item={button}
                            handler={props.buttonClickHandler}
                            {...props}
                        />
                    )) : ''}
                </CardActions>
            </Card>
        </Grid>
    );
}

export default ActionType2Renderer;