import React, { useState, useCallback, useContext } from 'react';
import TableContext, { START_GAME } from './mineSearch';

const Form = ({ }) => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(10);
  const value = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);
  
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);
  
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickButton = useCallback((e) => {
    dispatch({ type: START_GAME, row, cell, mine}, []);
  }, []);

  return (
    <div>
      <input type='number' placeholder='세로' value={row} onChange={onChangeRow}></input>
      <input type='number' placeholder='가로' value={cell} onChange={onChangeCell}></input>
      <input type='number' placeholder='지뢰' value={mine} onChange={onChangeMine}></input>
      <button onClick={onClickButton}></button>
    </div>
  )
}
export default Form;