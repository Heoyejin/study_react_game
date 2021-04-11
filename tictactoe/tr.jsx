import React, { memo, useEffect, useMemo, useRef}  from 'react';
import Td from './td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log("Tr rendering");
  const ref = useRef([]);
  useEffect(() => {
    // 성능 최적화 할 때 어느 부분 떄문에 랜더링이 계속 일어나는 지 확인 해봐야함
    console.log(rowData === ref.current[0], rowIndex === ref.current[1], dispatch === ref.current[2]);
    ref.current = [rowData, rowIndex, dispatch];
  }, [rowData, rowIndex, dispatch]);
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => 
      //최후에 수단으로 memo로 최적화가 되지 않으면 useMemo를 사용해야함 !! 최후의 수단 같은 느낌 
      // useMemo(() => {
      <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>
      // }, [rowData[i]])
      )}
    </tr>
  )
})
export default Tr;