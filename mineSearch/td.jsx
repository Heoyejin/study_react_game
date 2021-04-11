import React, { memo, useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, NORMALIZE_CELL, QUESTION_CELL, FLAG_CELL } from './mineSearch';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444'
      }
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white'
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red'
      }
    default:
      return {
        background: 'white'
      }
  }
};

const getTdText = (code) => {
  console.log("getTdText", code);
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};
const Td = memo(({ rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) return;
    console.log(tableData[rowIndex][cellIndex]);

    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch( {type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch( {type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])

  const onRightClickTd = useCallback((e) => {
    console.log(tableData[rowIndex][cellIndex]);
    if (halted) return;
    
    e.preventDefault();
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch( {type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        break;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch( {type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        break;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch( {type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        break;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])

  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu= {onRightClickTd}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  )
})
export default Td;