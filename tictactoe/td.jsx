import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './ticTacToe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    // 한번 누른 셀은 다시 못 누르게 변경 
    if (cellData) {
      return;
    }
    // dispatch에서 state 변경 하는 것은 비동기 !! 
    // 비동기 state를 처리하려면 무조건 useEffect 사용
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
}
export default Td;