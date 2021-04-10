import React from 'react';
import Tr from './tr';

const Table = ({ onClick, tableData }) => {
  return (
    <table onclick={onClick}>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowData={tableData[i]}>{''}</Tr>)}
    </table>
  )
}
export default Table;