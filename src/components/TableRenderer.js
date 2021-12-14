import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckBoxRenderer from './CheckBoxRenderer';
import Pagination from '@material-ui/lab/Pagination';
import FieldRenderer from './FieldRenderer';
import LinkRenderer from './LinkRenderer';
import ButtonRenderer from './ButtonRenderer';
import RadioButtonRenderer from './RadioButtonRenderer';
import IconButtonRenderer from './IconButtonRenderer';

export default function TableRenderer(props) {
  const { classes } = props;
  const [chkBoxVal, setChkBoxVal] = useState(false);
  const [headId, setHeadId] = useState('');

  const [radioVal, setRadioVal] = useState(null);

  const handleRadioChange = (event) => {
    setRadioVal(event.target.id);
  };

  const handlePageChange = (e, page) => {
    props.buttonClickHandler(props.item.id, page)
  };

  const handleHeadCheckboxClick = (e) => {
    if (props.headCheckboxList && props.headCheckboxList[e.target.id]) {
      setChkBoxVal(!props.headCheckboxList[e.target.id])
    } else {
      setChkBoxVal(e.target.checked)
    }
    setHeadId(e.target.id.substring(0, e.target.id.search('Head')))
    props.addToHeadCheckboxList(e.target.id, e.target.checked)
  };

  function parseDate(str) {
    var y = str.substr(0, 4),
      m = str.substr(4, 2) - 1,
      d = str.substr(6, 2);

    var D = new Date(Date.UTC(y, m, d));
    return (D.toLocaleDateString())
  }

  return (
    props.item ?
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader size="small" aria-label="customized table">
            {props.frame.fields.find((fld) => fld.renderTyp != undefined) != undefined ?
              <TableHead>
                {/* <TableRow className={classes.headVAlign}>
                  {props.item.header.item.filter((head) => props.hiddenFields.indexOf(head.id) === -1).map((head) => (
                    props.positionTypeframe ?
                      <TableCell key={head.id} className={classes.checkBoxCellHead}>
                        <span>
                          {(() => {
                            switch (true) {
                              case props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined:
                                var field = props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0);
                                return (
                                  <TableCell key={head.id}>
                                    <span>
                                      <IconButtonRenderer
                                        item={{
                                          id: 'POSITION'
                                        }}
                                        handler={props.buttonClickHandler}
                                        icon={'POSITION'}
                                        {...props}
                                      />
                                      <FieldRenderer
                                        key={field.id}
                                        item={field}
                                        attr={props.positionTypeframe.fields.find((fld) => fld.id === field.id)}
                                        handler={props.buttonClickHandler}
                                        // clear={clear}
                                        // setClear={setClear}
                                        // isTableCell={true}
                                        {...props}
                                      />
                                    </span>
                                  </TableCell>
                                )
                              default:
                                return (
                                  <TableCell key={head.id} className={classes.checkBoxCellHead}>
                                  </TableCell>
                                )
                              // default:
                              //   return (
                              //     ''
                              //   )
                            }
                          })()}
                        </span>
                      </TableCell>
                      :
                      ''
                  ))}
                </TableRow> */}
                <TableRow className={classes.headVAlign}>
                  {props.item.header.item.filter((head) => props.hiddenFields.indexOf(head.id) === -1).map((head) => (
                    props.frame.fields.find((fld) => fld.id === head.id) &&
                      props.frame.fields.find((fld) => fld.id === head.id).renderTyp != undefined ?
                      props.item.rows != '' ?
                        <TableCell key={head.id} className={classes.checkBoxCellHead}>
                          <span>
                            {(() => {
                              switch (true) {
                                case props.frame.fields.find((fld) => fld.id === head.id).renderTyp === 'btnCheckbox':
                                  return (
                                    <div>
                                      {props.positionTypeframe &&
                                        props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined ?
                                        <span>
                                          <FieldRenderer
                                            key={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0).id}
                                            item={props.fieldList.find((fld) => props.positionTypeframe.fields.find((pfld) => pfld.id === fld.id && head.id.search(fld.id.substr(1)) > 0))}
                                            attr={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0)}
                                            setItemValue={props.setItemValue}
                                            handler={props.buttonClickHandler}
                                            classes={classes}
                                            // clear={clear}
                                            // setClear={setClear}
                                            isTableCell={true}
                                          // {...props}
                                          />
                                          <IconButtonRenderer
                                            item={{
                                              id: 'POSITION'
                                            }}
                                            handler={props.buttonClickHandler}
                                            icon={'POSITION'}
                                            {...props}
                                          />
                                        </span>
                                        : ''}
                                      <div>
                                        <ButtonRenderer
                                          key={head.id}
                                          item={{
                                            "id": head.id
                                          }}
                                          handler={props.buttonClickHandler}
                                        />
                                      </div>
                                      <div>
                                        <CheckBoxRenderer
                                          item={{
                                            id: `${head.id}Head`
                                          }}
                                          onClick={handleHeadCheckboxClick}
                                          setItemValue={props.setItemValue}
                                          isTableCell={true}
                                        >
                                        </CheckBoxRenderer>
                                      </div>
                                    </div>
                                  )
                                default:
                                  return (
                                    ''
                                  )
                              }
                            })()}
                          </span>
                        </TableCell>
                        : ''
                      :
                      <TableCell key={head.id} className={classes.headVAlign}>
                        {props.positionTypeframe &&
                          props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined ?
                          <div>
                            <span>
                              <FieldRenderer
                                key={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0).id}
                                item={props.fieldList.find((fld) => props.positionTypeframe.fields.find((pfld) => pfld.id === fld.id && head.id.search(fld.id.substr(1)) > 0))}
                                attr={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0)}
                                setItemValue={props.setItemValue}
                                handler={props.buttonClickHandler}
                                classes={classes}
                                // clear={clear}
                                // setClear={setClear}
                                isTableCell={true}
                              // {...props}
                              />
                              <IconButtonRenderer
                                item={{
                                  id: 'POSITION'
                                }}
                                handler={props.buttonClickHandler}
                                icon={'POSITION'}
                                {...props}
                              />
                            </span>
                          </div>
                          : ''}
                        {head.value}
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              :
              <TableHead>
                {/* <TableRow className={classes.headVAlign}>
                  {props.item.header.item.filter((head) => props.hiddenFields.indexOf(head.id) === -1).map((head) => (
                    props.positionTypeframe ?
                      <TableCell key={head.id} className={classes.checkBoxCellHead}>
                        <span>
                          {(() => {
                            switch (true) {
                              case props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined:
                                var field = props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0);
                                return (
                                  <TableCell key={head.id}>
                                    <span>
                                      <IconButtonRenderer
                                        item={{
                                          id: 'POSITION'
                                        }}
                                        handler={props.buttonClickHandler}
                                        icon={'POSITION'}
                                        {...props}
                                      />
                                      <FieldRenderer
                                        key={field.id}
                                        item={field}
                                        attr={props.positionTypeframe.fields.find((fld) => fld.id === field.id)}
                                        handler={props.buttonClickHandler}
                                        // clear={clear}
                                        // setClear={setClear}
                                        // isTableCell={true}
                                        {...props}
                                      />
                                    </span>
                                  </TableCell>
                                )
                              default:
                                return (
                                  <TableCell key={head.id} className={classes.checkBoxCellHead}>
                                  </TableCell>
                                )
                              // default:
                              //   return (
                              //     ''
                              //   )
                            }
                          })()}
                        </span>
                      </TableCell>
                      :
                      ''
                  ))}
                </TableRow> */}
                <TableRow>
                  {props.item.header.item.filter((head) => props.hiddenFields.indexOf(head.id) === -1).map((head) => (
                    props.frame.fields.find((fld) => fld.id === head.id) &&
                      props.frame.fields.find((fld) => fld.id === head.id).renderTyp != undefined ?
                      props.item.rows != '' ?
                        <TableCell key={head.id} className={classes.checkBoxCellHead}>
                          <span>
                            {(() => {
                              switch (true) {
                                case props.frame.fields.find((fld) => fld.id === head.id).renderTyp === 'btnCheckbox':
                                  return (
                                    <div>
                                      {props.positionTypeframe &&
                                        props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined ?
                                        <span>
                                          <FieldRenderer
                                            key={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0).id}
                                            item={props.fieldList.find((fld) => props.positionTypeframe.fields.find((pfld) => pfld.id === fld.id && head.id.search(fld.id.substr(1)) > 0))}
                                            attr={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0)}
                                            setItemValue={props.setItemValue}
                                            handler={props.buttonClickHandler}
                                            classes={classes}
                                            // clear={clear}
                                            // setClear={setClear}
                                            isTableCell={true}
                                          // {...props}
                                          />
                                          <IconButtonRenderer
                                            item={{
                                              id: 'POSITION'
                                            }}
                                            handler={props.buttonClickHandler}
                                            icon={'POSITION'}
                                            {...props}
                                          />
                                        </span>
                                        : ''}
                                      <div>
                                        <ButtonRenderer
                                          key={head.id}
                                          item={{
                                            "id": head.id
                                          }}
                                          handler={props.buttonClickHandler}
                                        />
                                      </div>
                                      <div>
                                        <CheckBoxRenderer
                                          item={{
                                            id: `${head.id}Head`
                                          }}
                                          onClick={handleHeadCheckboxClick}
                                          setItemValue={props.setItemValue}
                                          isTableCell={true}
                                        >
                                        </CheckBoxRenderer>
                                      </div>
                                    </div>
                                  )
                                default:
                                  return (
                                    ''
                                  )
                              }
                            })()}
                          </span>
                        </TableCell>
                        : ''
                      :
                      <TableCell key={head.id} className={classes.headVAlign}>
                        {props.positionTypeframe &&
                          props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined ?
                          <div>
                            <span>
                              <FieldRenderer
                                key={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0).id}
                                item={props.fieldList.find((fld) => props.positionTypeframe.fields.find((pfld) => pfld.id === fld.id && head.id.search(fld.id.substr(1)) > 0))}
                                attr={props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0)}
                                setItemValue={props.setItemValue}
                                handler={props.buttonClickHandler}
                                classes={classes}
                                // clear={clear}
                                // setClear={setClear}
                                isTableCell={true}
                              // {...props}
                              />
                              <IconButtonRenderer
                                item={{
                                  id: 'POSITION'
                                }}
                                handler={props.buttonClickHandler}
                                icon={'POSITION'}
                                {...props}
                              />
                            </span>
                          </div>
                          : ''}
                        {head.value}
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            }
            <TableBody>
              {/* Verifying the data in grid */}
              {props.item.rows.row ?

                /* If there is more than one row in the table then map through them */
                Array.isArray(props.item.rows.row) ?
                  props.item.rows.row.map((row, idx1) => (
                    <TableRow key={row.nr}>

                      {/* Map through each column in a row */}
                      {row.item.filter((col) => props.hiddenFields.indexOf(col.id) === -1).map((col, idx2) => (

                        props.colType && props.colType.find((item) => item.id === col.id) != undefined &&
                          props.colType.find((item) => item.id === col.id).type === 'checkbox' ?
                          <TableCell key={col.id} className={classes.checkBoxCellBody}>
                            <CheckBoxRenderer
                              item={col}
                              idx={idx1 + 1}
                              defaultVal={chkBoxVal}
                              headId={headId}
                              setItemValue={props.setItemValue}
                              isTableCell={true}
                            >
                            </CheckBoxRenderer>
                          </TableCell>
                          :
                          props.colType && props.colType.find((item) => item.id === col.id) != undefined &&
                            props.colType.find((item) => item.id === col.id).type === 'radio' ?
                            <TableCell key={col.id} className={classes.radioButtonCell}>
                              <RadioButtonRenderer
                                linklist={props.item.header.item.find((elem) => elem.id === col.id).linklist}
                                item={col}
                                idx={idx1 + 1}
                                value={radioVal}
                                handler={handleRadioChange}
                              >
                              </RadioButtonRenderer>
                            </TableCell>
                            :
                            <TableCell key={col.id} className={props.frame.fields.find((fld) => fld.id === col.id) != undefined && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'B' ? classes.checkBoxCellBody : ''}>
                              <span>
                                {(() => {
                                  switch (true) {
                                    case col.visible && col.visible === 'false':
                                      return (
                                        <FieldRenderer
                                          item={col}
                                          attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                          idx={idx1 + 1}
                                          classes={classes}
                                          isTableCell={true}
                                          setItemValue={props.setItemValue}
                                          helperTextStyle={props.helperTextStyle ? props.helperTextStyle : ''}
                                        />
                                      )
                                      break;

                                    case props.frame.fields.find((fld) => fld.id === col.id) != undefined && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'B':
                                      if (col.editable && col.editable === 'false')
                                        return ''
                                      else
                                        return (
                                          <FieldRenderer
                                            idx={idx1 + 1}
                                            attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                            item={col}
                                            classes={classes}
                                            isTableCell={true}
                                            defaultVal={chkBoxVal}
                                            headId={headId}
                                            setItemValue={props.setItemValue}
                                            helperTextStyle={props.helperTextStyle ? props.helperTextStyle : ''}
                                          />
                                        )
                                      break;

                                    // case props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'D':
                                    //     return (
                                    //       <FieldRenderer
                                    //         item={col}
                                    //         attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                    //         idx={idx1 + 1}
                                    //         classes={classes}
                                    //       />
                                    //     )

                                    case props.colType && props.colType.find((item) => item.id === col.id) != undefined:
                                      switch (props.colType.find((item) => item.id === col.id).type) {
                                        case 'link':
                                          return (
                                            <LinkRenderer
                                              item={col}
                                              idx={idx1 + 1}
                                              attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                              action={props.colType.find((item) => item.id === col.id).action ?
                                                props.colType.find((item) => item.id === col.id).action : ''}
                                              button={props.colType.find((item) => item.id === col.id) ?
                                                props.colType.find((item) => item.id === col.id).button : ''}
                                              handler={props.buttonClickHandler}
                                              setItemValue={props.setItemValue}
                                            />
                                          )

                                        case 'checkbox':
                                          return (
                                            <CheckBoxRenderer
                                              item={col}
                                              idx={idx1 + 1}
                                              defaultVal={chkBoxVal}
                                              headId={headId}
                                              setItemValue={props.setItemValue}
                                              isTableCell={true}
                                            >
                                            </CheckBoxRenderer>
                                          )

                                        case 'radio':
                                          return (
                                            <RadioButtonRenderer
                                              linklist={props.item.header.item.find((elem) => elem.id === col.id).linklist}
                                              item={col}
                                              idx={idx1 + 1}
                                              value={radioVal}
                                              handler={handleRadioChange}
                                            >
                                            </RadioButtonRenderer>
                                          )
                                      }
                                      break;

                                    case props.frame.fields.find((fld) => fld.id === col.id) && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'L' &&
                                      props.ddlData[col.id] != undefined:
                                      switch (props.ddlData[col.id].view) {
                                        case 'code':
                                          return col.value
                                        case 'value':
                                          if (props.ddlData[col.id].item != undefined &&
                                            props.ddlData[col.id].item.find((val) => val.code === col.value) != undefined)
                                            return props.ddlData[col.id].item.find((val) => val.code === col.value).value
                                          else
                                            return col.value
                                        case 'code-value':
                                          if (props.ddlData[col.id].item != undefined &&
                                            props.ddlData[col.id].item.find((val) => val.code === col.value) != undefined)
                                            return col.value + ' - ' + props.ddlData[col.id].item.find((val) => val.code === col.value).value
                                          else
                                            return col.value
                                      }
                                      break;

                                    case col.editable && col.editable === 'true':
                                      return (
                                        <FieldRenderer
                                          item={col}
                                          attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                          idx={idx1 + 1}
                                          classes={classes}
                                          isTableCell={true}
                                          setItemValue={props.setItemValue}
                                          helperTextStyle={props.helperTextStyle ? props.helperTextStyle : ''}
                                        />
                                      )

                                    default:
                                      if (props.frame.fields.find((fld) => fld.id === col.id) && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'D')

                                        if (col.value != '0')
                                          return (
                                            parseDate(col.value.toString())
                                          )
                                        else
                                          return ('')
                                      else
                                        return (
                                          props.ddlData && props.ddlData[col.id] && props.ddlData[col.id].item != undefined &&
                                            props.ddlData[col.id].item.find((data) => data.code === col.value) ?
                                            props.ddlData[col.id].item.find((data) => data.code === col.value).value
                                            :
                                            col.value
                                        )
                                  }
                                })()}
                              </span>
                            </TableCell>
                      ))}
                    </TableRow>
                  ))
                  :
                  <TableRow key={props.item.rows.row.nr}>

                    {/* Map through each column in a row */}
                    {props.item.rows.row.item.filter((col) => props.hiddenFields.indexOf(col.id) === -1).map((col, idx) => (

                      props.colType && props.colType.find((item) => item.id === col.id) != undefined &&
                        props.colType.find((item) => item.id === col.id).type === 'checkbox' ?
                        <TableCell key={col.id} className={classes.checkBoxCellBody}>
                          <CheckBoxRenderer
                            item={col}
                            idx={1}
                            defaultVal={chkBoxVal}
                            headId={headId}
                            setItemValue={props.setItemValue}
                            isTableCell={true}
                          >
                          </CheckBoxRenderer>
                        </TableCell>
                        :
                        props.colType && props.colType.find((item) => item.id === col.id) != undefined &&
                          props.colType.find((item) => item.id === col.id).type === 'radio' ?
                          <TableCell key={col.id} className={classes.radioButtonCell}>
                            <RadioButtonRenderer
                              linklist={props.item.header.item.find((elem) => elem.id === col.id).linklist}
                              item={col}
                              idx={1}
                              value={radioVal}
                              handler={handleRadioChange}
                            >
                            </RadioButtonRenderer>
                          </TableCell>
                          :
                          <TableCell key={col.id} className={props.frame.fields.find((fld) => fld.id === col.id) != undefined && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'B' ? classes.checkBoxCellBody : ''}>
                            <span>
                              {(() => {
                                switch (true) {
                                  case col.visible && col.visible === 'false':
                                    return (
                                      <FieldRenderer
                                        idx={1}
                                        attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                        item={col}
                                        classes={classes}
                                        isTableCell={true}
                                        setItemValue={props.setItemValue}
                                        helperTextStyle={props.helperTextStyle ? props.helperTextStyle : ''}
                                      />
                                    )

                                  case props.frame.fields.find((fld) => fld.id === col.id) != undefined && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'B':
                                    if (col.editable && col.editable === 'false')
                                      return ''
                                    else
                                      return (
                                        <FieldRenderer
                                          idx={1}
                                          attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                          item={col}
                                          classes={classes}
                                          isTableCell={true}
                                          defaultVal={chkBoxVal}
                                          headId={headId}
                                          setItemValue={props.setItemValue}
                                          helperTextStyle={props.helperTextStyle ? props.helperTextStyle : ''}
                                        />
                                      )

                                  // case props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'D':
                                  //     return (
                                  //       <FieldRenderer
                                  //         idx={1}
                                  //         attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                  //         item={col}
                                  //         classes={classes}
                                  //       />
                                  //     )

                                  case props.colType && props.colType.find((item) => item.id === col.id) != undefined:
                                    switch (props.colType.find((item) => item.id === col.id).type) {
                                      case 'link':
                                        return (
                                          <LinkRenderer
                                            item={col}
                                            attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                            idx={1}
                                            action={props.colType.find((item) => item.id === col.id).action ?
                                              props.colType.find((item) => item.id === col.id).action : ''}
                                            button={props.colType.find((item) => item.id === col.id) ?
                                              props.colType.find((item) => item.id === col.id).button : ''}
                                            handler={props.buttonClickHandler}
                                            setItemValue={props.setItemValue}
                                          />
                                        )

                                      case 'checkbox':
                                        return (
                                          <CheckBoxRenderer
                                            item={col}
                                            idx={1}
                                            defaultVal={chkBoxVal}
                                            headId={headId}
                                            setItemValue={props.setItemValue}
                                            isTableCell={true}
                                          >
                                          </CheckBoxRenderer>
                                        )

                                      case 'radio':
                                        return (
                                          <RadioButtonRenderer
                                            linklist={props.item.header.item.find((elem) => elem.id === col.id).linklist}
                                            item={col}
                                            idx={idx1 + 1}
                                            value={radioVal}
                                            handler={handleRadioChange}
                                          >
                                          </RadioButtonRenderer>
                                        )
                                    }
                                    break;

                                  case props.frame.fields.find((fld) => fld.id === col.id) && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'L' &&
                                    props.ddlData[col.id] != undefined:
                                    switch (props.ddlData[col.id].view) {
                                      case 'code':
                                        return col.value
                                      case 'value':
                                        if (props.ddlData[col.id].item != undefined &&
                                          props.ddlData[col.id].item.find((val) => val.code === col.value) != undefined)
                                          return props.ddlData[col.id].item.find((val) => val.code === col.value).value
                                        else
                                          return col.value
                                      case 'code-value':
                                        if (props.ddlData[col.id].item != undefined &&
                                          props.ddlData[col.id].item.find((val) => val.code === col.value) != undefined)
                                          return col.value + ' - ' + props.ddlData[col.id].item.find((val) => val.code === col.value).value
                                        else
                                          return col.value
                                    }

                                  case col.editable && col.editable === 'true':
                                    return (
                                      <FieldRenderer
                                        idx={1}
                                        attr={props.frame.fields.find((fld) => fld.id === col.id)}
                                        item={col}
                                        classes={classes}
                                        isTableCell={true}
                                        setItemValue={props.setItemValue}
                                        helperTextStyle={props.helperTextStyle ? props.helperTextStyle : ''}
                                      />
                                    )

                                  default:
                                    if (props.frame.fields.find((fld) => fld.id === col.id) && props.frame.fields.find((fld) => fld.id === col.id).fldTyp === 'D')

                                      if (col.value != '0')
                                        return (
                                          parseDate(col.value.toString())
                                        )
                                      else
                                        return ('')
                                    else
                                      return (
                                        props.ddlData && props.ddlData[col.id] && props.ddlData[col.id].item != undefined &&
                                          props.ddlData[col.id].item.find((data) => data.code === col.value) ?
                                          props.ddlData[col.id].item.find((data) => data.code === col.value).value
                                          :
                                          col.value
                                      )
                                }
                              })()}
                            </span>
                          </TableCell>
                    ))}
                  </TableRow>
                :
                <TableRow>
                  <TableCell className={classes.emptyTable} colSpan={props.item.header.item.length}>{'No data'}</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        {props.item.maxpages > 1 ?
          <Pagination
            count={parseInt(props.item.maxpages)}
            page={parseInt(props.item.pagenr)}
            showFirstButton
            showLastButton
            onChange={(e, page) => handlePageChange(e, page)}
          />
          : ''
        }
      </div>
      : ''
  );
}

// {props.positionTypeframe ?
//   <TableHead>
//     <TableRow>
//       {props.item.header.item.filter((head) => props.hiddenFields.indexOf(head.id) === -1).map((head) =>
//         <span>
//           {(() => {
//             switch (true) {
//               case props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0) != undefined:
//                 var field = props.positionTypeframe.fields.find((fld) => head.id.search(fld.id.substr(1)) > 0);
//                 return (
//                   <TableCell key={head.id}>
//                     YES
//                     {/* <span>
//                       <IconButtonRenderer
//                         item={{
//                           id: 'POSITION'
//                         }}
//                         handler={props.buttonClickHandler}
//                         icon={'POSITION'}
//                         {...props}
//                       />
//                       <FieldRenderer
//                         key={field.id}
//                         item={field}
//                         attr={props.positionTypeframe.fields.find((fld) => fld.id === field.id)}
//                         handler={props.buttonClickHandler}
//                         // clear={clear}
//                         // setClear={setClear}
//                         isTableCell={true}
//                         {...props}
//                       />
//                     </span> */}
//                   </TableCell>
//                 )
//               default:
//                 return (
//                   <TableCell key={head.id} className={classes.checkBoxCellHead}>
//                     NO
//                   </TableCell>
//                 )
//             }
//           })()}
//         </span>
//       )}
//     </TableRow>
//   </TableHead>
//   :
//   ''
// }