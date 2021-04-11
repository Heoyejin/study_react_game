import React, { createContext, useMemo, useReducer } from 'react';
import Table from './table';
import Form from './form';

export const CODE = {
  MINE: -7,
  NORMAL : -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  })
  const shuffle = [];
  while(candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
}

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {}
});

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const FLAG_CELL = 'FLAG_CELL';

// state 선언 구간 
const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  // 게임 멈추는 변수
  halted: true
};

// setState 하는 구간 
const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME: 
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false
      }
    case OPEN_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;
      return {
        ...state,
        tableData
      }
    case CLICK_MINE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.FLAG_MINE ? CODE.QUESTION_MINE : CODE.QUESTION;
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;
      return {
        ...state,
        tableData,
      }
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const value = useMemo(() => ({
    tableData: state.tableData, 
    halted: state.halted,
    dispatch 
  }), [state.tableData, state.halted]);

  return (
    // provider로 감싸 줘야 이 내부의 컴포넌트에서 TableContext 사용가능
    // Context API는 아래 value를 계속 다시 생성하기 때문에  성능 최적화에 어려움이 있음
    <TableContext.Provider value={value}>
      <Form></Form>
      <div>{state.timer}</div>
      <Table></Table>
      <div>{state.result}</div>
    </TableContext.Provider>
  )
}
export default MineSearch;