import React, { useState, useRef } from 'react';
import StateMessage from './stateMessage_hooks';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);
  // state와 ref의 차이는 state는 변경하면 render가 다시 실행 되지만 ref는 변경해도 다시 실행되지 않음.
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요!');

      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
        // 랜덤하게 1~3초 뒤에 변경되도록 함 
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') { // 성급하게 클릭한경우
      clearTimeout(timeout.current);

      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
     } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();

      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current]
      });
    }
  }
  
  
  const renderAverage = () => {
    return result.length === 0 ? null : <StateMessage result={result} onReset={onReset}/>
  }
  
  const onReset = (r) => {
    setResult(r);
  }

  return (
    <>
      <div
        id='screen'
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  )
}

export default ResponseCheck;