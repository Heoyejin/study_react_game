import React, { memo, useCallback, useEffect, useReducer, useRef } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './ticTacToe';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log("Td rendering");
  const ref = useRef([]);
  useEffect(() => {
    // 성능 최적화 할 때 어느 부분 떄문에 랜더링이 계속 일어나는 지 확인 해봐야함
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], cellData === ref.current[2], dispatch === ref.current[3]);
    console.log(cellData, ref.current[2]);
    ref.current = [rowIndex, cellIndex, cellData, dispatch];
  }, [rowIndex, cellIndex, cellData, dispatch]);
  
  // props 로 넣어주는 함수는 useCallback으로 선언해 줘야하고 함수 내부에 바뀌는 데이터를 인자로 넣어줘야함.
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
})
export default Td;