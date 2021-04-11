import React from 'react';
import Tr from './tr';

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table onclick={onClick}>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowData={tableData[i]} rowIndex={i} dispatch={dispatch}>{''}</Tr>)}
    </table>
  )
}
export default Table;