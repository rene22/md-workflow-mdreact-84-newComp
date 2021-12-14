import React from 'react';
import FieldRenderer from './FieldRenderer';
import { Grid, Card, CardContent } from '@material-ui/core';

function PainTextType1Renderer(props) {
    const {classes} = props;

    return (
        <Grid item xs={12} lg={12}>
            <Card>
                <CardContent>
                {props.fieldList.filter((field) => props.frame.fields.findIndex((fld) => fld.id === field.id) >= 0).map((field) => (
                    <FieldRenderer 
                        key={field.id}
                        item={field}
                        attr={props.frame.fields.find((fld) => fld.id === field.id)}
                        {...props}
                    />
                ))}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PainTextType1Renderer;