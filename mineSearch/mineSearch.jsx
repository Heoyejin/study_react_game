import React, { useReducer } from 'react';
import Table from './table';
import Form from './form';

// state 선언 구간 
const initialState = {
};

// setState 하는 구간 
const reducer = (state, action) => {
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      <Form></Form>
      <div>{state.timer}</div>
      <Table></Table>
      <div>{state.result}</div>
    </>
  )
}
export default MineSearch;