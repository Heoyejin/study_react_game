import React, { memo, useContext, useCallback, useMemo } from 'react';
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
  console.log("getTdText - 실제 render 는 한번만 됨 (useMemo 사용)", code);
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

  console.log("Td rendered - 함수 실행은 여러번 실행되지만 ");
  // return useMemo(() => (
  //   <td
  //     style={getTdStyle(tableData[rowIndex][cellIndex])}
  //     onClick={onClickTd}
  //     onContextMenu= {onRightClickTd}
  //   >
  //     {getTdText(tableData[rowIndex][cellIndex])}
  //   </td>
  // ), [tableData[rowIndex][cellIndex]]);

  // useMemo, memo 두가지 방법으로 사용가능
  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
})

const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  console.log('real td rendered');
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});

export default Td;