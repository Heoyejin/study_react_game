import React, { useState, useReducer } from 'react';
import Table from './table';

const initialState = {
  winner: '',
  turn: '0',
  tableData: [['','',''], ['','',''], ['','','']]
};

const reducer = {

};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

  // 실제 클릭하는건 td 컴포넌트를 클릭하는데 처리는 여기서 해줌 (연결하는 작업이 필요함) 
  return (
    <>
      <Table></Table>
      { winner && <div>{winner}님의 승리 !</div>}
    </>
  )
}
export default TicTacToe;