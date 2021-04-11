import React, { memo, useContext}  from 'react';
import { TableContext } from './mineSearch';
import Td from './td';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      { tableData[0] && Array(tableData[0].length).fill().map((td, i) => 
        <Td rowIndex={rowIndex} cellIndex={i}></Td>
      )}
    </tr>
  )
})
export default Tr;