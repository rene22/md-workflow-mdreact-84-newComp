import React, { useState, useEffect } from 'react';

export default function PlainTextRenderer(props) {

    return (
        props.ddlData && props.ddlData[props.item.id] && props.ddlData[props.item.id].item != undefined &&
            props.ddlData[props.item.id].item.find((data) => data.code === props.item.value) ?
            props.ddlData[props.item.id].item.find((data) => data.code === props.item.value).value
            :
            props.item.value
    );
}