import React, { useState, useEffect } from 'react';
import ActionType1Renderer from './ActionType1Renderer';
import ActionType2Renderer from './ActionType2Renderer';
import ActionType3Renderer from './ActionType3Renderer';
import PainTextType1Renderer from './PainTextType1Renderer';
import SearchType1Renderer from './SearchType1Renderer';
import ButtonGroupType1Renderer from './ButtonGroupType1Renderer';
import TableType1Renderer from './TableType1Renderer';
import TableType2Renderer from './TableType2Renderer';
import UpdTableType1Renderer from './UpdTableType1Renderer';
import HiddenTextType1Renderer from './HiddenTextType1Renderer';
import DiagrammerType1Renderer from './DiagrammerType1Renderer';
import SwitchType1Renderer from './SwitchType1Renderer';

function FramesRenderer(props) {
    const { classes } = props;

    return (
        (() => {
            switch (props.frame.type) {
                case 'switch-type1':
                    return (
                        <SwitchType1Renderer checked={props.checked} onChange={props.handleChange} {...props} />
                    )

                case 'action-type1':
                    if (props.gridList.find((table) => table.updatable === 'true') != undefined
                        || props.checked
                        // || props.frame.enable === undefined
                        // || (props.frame.enable && props.frame.enable === 'true')
                    ) {
                        return (
                            <ActionType1Renderer {...props} />
                        )
                    }
                    else
                        return null;

                case 'action-type2':
                    return (
                        <ActionType2Renderer {...props} />
                    )

                case 'action-type3':
                    return (
                        <ActionType3Renderer {...props} />
                    )

                case 'plain-text-type1':
                    return (
                        <PainTextType1Renderer {...props} />
                    )

                case 'hidden-text-type1':
                    return (
                        <HiddenTextType1Renderer {...props} />
                    )

                case 'search-type1':
                    if (props.gridList.find((table) => table.updatable === 'true') != undefined
                        || props.checked
                        // || props.frame.enable === undefined
                        // || (props.frame.enable && props.frame.enable === 'true')
                    ) {
                        return (
                            <SearchType1Renderer {...props} />
                        )
                    }
                    else
                        return null;

                case 'button-group-type1':
                    return (
                        <ButtonGroupType1Renderer {...props} />
                    )

                case 'table-type1':
                    if (props.gridList.find((table) => table.id === props.frame.tableID && table.updatable === 'true') != undefined)
                        return (
                            <UpdTableType1Renderer {...props} />
                        )
                    else
                        return (
                            <TableType1Renderer {...props} />
                        )

                case 'table-type2':
                    return (
                        <TableType2Renderer {...props} />
                    )

                case 'upd-table-type1':
                    return (
                        <UpdTableType1Renderer {...props} />
                    )

                case 'diagrammer-type1':
                    return (
                        <DiagrammerType1Renderer {...props} />
                    )

                default:
                    return null;
            }
        })()
    );
}

export default FramesRenderer;