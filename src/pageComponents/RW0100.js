/** @format */

import React from 'react';
import ActionType2Renderer from '../components/ActionType2Renderer';
import ActionType1Renderer from '../components/ActionType1Renderer';
import ActionType3Renderer from '../components/ActionType3Renderer';
import PainTextType1Renderer from '../components/PainTextType1Renderer';
import SearchType1Renderer from '../components/SearchType1Renderer';
import ButtonGroupType1Renderer from '../components/ButtonGroupType1Renderer';
import TableType1Renderer from '../components/TableType1Renderer';
import TableType2Renderer from '../components/TableType2Renderer';
import UpdTableType1Renderer from '../components/UpdTableType1Renderer';
import HiddenTextType1Renderer from '../components/HiddenTextType1Renderer';
import SwitchType1Renderer from '../components/SwitchType1Renderer';
import PositionType1Renderer from '../components/PositionType1Renderer';
import CalendarType1Renderer from '../components/CalendarType1Renderer';
import CalendarType3Renderer from '../components/CalendarType3Renderer';

function RW0100(props) {
  const { classes } = props;

  return props.baseTemplates[props.currentScreen] &&
    props.baseTemplates[props.currentScreen].frame
    ? props.baseTemplates[props.currentScreen].frame.map((frame) =>
        (() => {
          switch (frame.type) {
            case 'switch-type1':
              return <SwitchType1Renderer {...props} />;

            // case 'position-type1':
            //     return (
            //         <PositionType1Renderer
            //             frame={frame}
            //             {...props}
            //         />
            //     )

            case 'action-type1':
              if (
                props.gridList.find((table) => table.updatable === 'true') !=
                  undefined ||
                props.switchedOn
              ) {
                return <ActionType1Renderer frame={frame} {...props} />;
              } else return null;

            case 'action-type2':
              return <ActionType2Renderer frame={frame} {...props} />;

            case 'action-type3':
              return <ActionType3Renderer frame={frame} {...props} />;

            case 'plain-text-type1':
              return <PainTextType1Renderer frame={frame} {...props} />;

            case 'hidden-text-type1':
              return <HiddenTextType1Renderer frame={frame} {...props} />;

            case 'search-type1':
              if (
                props.gridList.find((table) => table.updatable === 'true') !=
                  undefined ||
                props.switchedOn
              ) {
                return <SearchType1Renderer frame={frame} {...props} />;
              } else return null;

            case 'button-group-type1':
              return <ButtonGroupType1Renderer frame={frame} {...props} />;

            case 'table-type1':
              if (
                props.gridList.find(
                  (table) =>
                    table.id === frame.tableID && table.updatable === 'true'
                ) != undefined
              )
                return <UpdTableType1Renderer frame={frame} {...props} />;
              else
                return (
                  <TableType1Renderer
                    frame={frame}
                    positionTypeframe={props.baseTemplates[
                      props.currentScreen
                    ].frame.find((frame) => frame.type === 'position-type1')}
                    {...props}
                  />
                );

            case 'table-type2':
              return <TableType2Renderer frame={frame} {...props} />;

            case 'upd-table-type1':
              return <UpdTableType1Renderer frame={frame} {...props} />;

            case 'diagrammer-type1':
              return <DiagrammerType1Renderer frame={frame} {...props} />;

            case 'calendar-type3':
              if (
                props.gridList.find(
                  (table) =>
                    table.id === frame.tableID && table.updatable === 'true'
                ) != undefined
              )
                return <div>test1</div>;
              else
                return (
                  <CalendarType3Renderer
                    frame={frame}
                    positionTypeframe={props.baseTemplates[
                      props.currentScreen
                    ].frame.find((frame) => frame.type === 'position-type1')}
                    {...props}
                  />
                );

            default:
              return null;
          }
        })()
      )
    : '';
}

export default RW0100;
