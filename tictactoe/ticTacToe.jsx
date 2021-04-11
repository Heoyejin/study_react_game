import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './table';

// state 선언 구간 
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''], 
    ['','',''], 
    ['','','']
  ],
  recentCell: [-1, -1]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESUT_GAME = 'RESUT_GAME';

// setState 하는 구간 
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
        tableData,
        recentCell: [action.row, action.cell]
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
    case RESUT_GAME: {
      return {
        ...state, 
        turn: 'O',
        tableData: [
          ['','',''], 
          ['','',''], 
          ['','','']
        ],
        recentCell: [-1, -1]
      }
    }
  }
};

const TicTacToe = () => {
  // state 여러개를 한번에 선언하고 처리할 수 있는 useReducer !!
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O'});
  }, []);
  // 실제 클릭하는건 td 컴포넌트를 클릭하는데 처리는 여기서 해줌 (연결하는 작업이 필요함) 

  // 틱택토의 알고리즘은 클릭한 셀에서 체킹해야할 셀들만 검새해주면 됨
  useEffect (() => {
    const [row, cell] = recentCell;
    let win = false;
    // console.log(row, cell, win, tableData);
    if (row < 0) return;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    } else if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    } else if (tableData[0][cell] === turn && tableData[1][cell + 1] === turn && tableData[2][cell + 2] === turn) {
      win = true;
    } else if (tableData[0][cell] === turn && tableData[1][cell - 1] === turn && tableData[2][cell - 2] === turn) {
      win = true;
    }

    if (win) {
      // dispatch가 setState와 같은 Action이고 type이 Action의 이름
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESUT_GAME});
    } else {
      let all = true; // all이 true면 게임 끝! 무승부라는 뜻
      tableData.forEach((row) => {
        row.forEach((cell) => {
          // 비어있는 셀이 있으면 계속 게임 진행
          if (!cell) all = false;
        })
      });
      if (all) dispatch({type: RESUT_GAME});
      else dispatch({ type: CHANGE_TURN });
    }
  }, [recentCell]);

  return (
    <>
      {/* dispath를 td 컴포넌트에서 사용하려면 이렇게 전달 해줘야함*/}
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}></Table>
      { winner && <div>{winner}님의 승리 !</div>}
    </>
  )
}
export default TicTacToe;