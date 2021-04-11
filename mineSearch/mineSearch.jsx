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
  tableData: [
    [],
    [],
    [],
    [],
    []
  ],
  dispatch: () => {}
});

export const START_GAME = 'START_GAME';

// state 선언 구간 
const initialState = {
  tableData: [],
  timer: 0,
  result: ''
};

// setState 하는 구간 
const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME: 
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const value = useMemo(() => ({
    tableData: state.tableData, 
    dispatch 
  }), [state.tableData]);

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