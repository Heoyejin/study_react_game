import React, { useState, useRef, memo } from 'react';
import Try from './try_hooks';

// this를 사용하지 않는 경우에는 밖에 분리해서 정의하는게 좋음
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = memo(() => {
  const [result, setResult] = useState(''); 
  const [value, setValue] = useState(''); 
  const [answer, setAnswer] = useState(getNumbers()); 
  const [tries, setTries] = useState([]); 
  const inputRef = useRef();
  
  const onSubmitForm = (e) => {
    // 이렇게 사용하면 this.state를 비구조 할당으로 this.state를 생략하고 사용할 수 있음
    // const [result, value, tries] = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      setValue('');
      setTries([...tries, { try: value, result: '홈런'}]);
      
      alert('정답 입니다 !!! 게임을 다시 시작합니다.');

      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArr = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9){
        setResult(`기회를 모두 사용하였습니다. 정답은 ${anwer.join('')} 입니다!`);
        
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArr[i] === answer[i]) strike += 1;
          else if (answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        setValue('');
        setTries([...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]);
      }
    }

    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} ref={inputRef} onChange={onChangeInput}></input>
      </form>
      <div>시도한 횟수: {tries.length}</div>
      <ul>
        {
          tries.map((v, i) => {
            return <Try key={v.try + i} tryInfo={v} index={i}></Try>
          })
        }      
      </ul>
    </>
  )
})

export default NumberBaseball;