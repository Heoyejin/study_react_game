import React, { useState, useReducer, useCallback } from 'react';
import Table from './table';

const initialState = {
  winner: '',
  turn: '0',
  tableData: [['','',''], ['','',''], ['','','']]
};

const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner 이렇게 직접 넣어주면 안됨...
      return {
        ...state,
        winner: action.winner
      };
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: '0'});
  }, []);
  // 실제 클릭하는건 td 컴포넌트를 클릭하는데 처리는 여기서 해줌 (연결하는 작업이 필요함) 
  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData}></Table>
      { state.winner && <div>{state.winner}님의 승리 !</div>}
    </>
  )
}
export default TicTacToe;