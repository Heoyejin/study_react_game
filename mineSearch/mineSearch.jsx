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

// state 선언 구간 
const initialState = {
  tableData: [],
  timer: 0,
  result: ''
};

export const START_GAME = 'START_GAME';

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

const plantMine = () => {

}

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