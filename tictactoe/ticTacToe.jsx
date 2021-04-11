import React, { useReducer, useCallback } from 'react';
import Table from './table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''], 
    ['','',''], 
    ['','','']
  ]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner 이렇게 직접 넣어주면 안됨...
      return {
        ...state,
        winner: action.winner
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      // ... 는 얕은 복사!
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O'});
  }, []);
  // 실제 클릭하는건 td 컴포넌트를 클릭하는데 처리는 여기서 해줌 (연결하는 작업이 필요함) 
  return (
    <>
      {/* dispath를 td 컴포넌트에서 사용하려면 이렇게 전달 해줘야함*/}
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}></Table>
      { winner && <div>{winner}님의 승리 !</div>}
    </>
  )
}
export default TicTacToe;