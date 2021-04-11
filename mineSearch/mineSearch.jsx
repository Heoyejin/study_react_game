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
      // 열리는 모든 칸의 불변성을 지켜줘야함
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      const checkArround = (row, cell) => {
        // 상하좌우 없는 칸은 열지 않기
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes((tableData[row][cell]))) return;
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) return;
        
        // 한번 검사한 셀은 다시 호출 하지 않는 로직 추가
        if (checked.includes(row + ',' + cell)) return; 
        else checked.push(row + ',' + cell);
  
        // 한 번 연 칸은 무시하기
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        // 선택한 행 위의 데이터 입력
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        } 
      
        // 선택한 행 데이터 입력
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1]
        );
  
        // 선택한 행 아래 행 데이터 입력 
        if (tableData[row + 1]){
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        } 
  
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        console.log(around, count);
        tableData[row][cell] = count;
        
        if (count === 0) {
          const near = [];
          if (row - 1 > -1) { 
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          
          if (row - 1 > tableData.length) { 
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            // 닫혀 있는 셀만 열도록 변경
            if (tableData[n[0], n[1]] !== CODE.OPENED) {
              checkArround(n[0], n[1]);
            }
          });
        }
        tableData[row][cell] = count; 
      };
      checkArround(action.row, action.cell);
      return {
        ...state,
        tableData
      }
    case CLICK_MINE: {
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