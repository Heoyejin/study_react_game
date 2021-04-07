import React, { useState, useRef, useEffect } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    // splice는 어떤 배열에서 특정 구간을 빼오는 것 !
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  // sort 함수를 이용해서 오름차순 정렬
  const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
  console.log("getWinNumbers", winNumbers, bonusNumber);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // timeouts.current에 요소가 추가되는 경우에는 timeouts.current가 변경되는 것은 아님 => useEffect 실행 안됨
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    // 여기가 componentWillUnMount
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    }
  }, [timeouts.current]);   // inputs가 빈 배열이면 componentDidMount와 동일함.
  // 배열에 요소가 있으면 componentDidMount, componentDidUpdate 역할을 함
  // 조건을 추가해 줄 수도 있음

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());  // 당첨 숫자들
    setWinBalls([]);
    setBonus(null); // 보너스 공
    setRedo(false)
    // 여기서 timeouts.current가 변경됨
    timeouts.current = [];
  }

  return (
    <>
    <div>당첨 숫자</div>
    <div id="result">
      {winBalls.map((v, i) => <Ball key={v + i} number={v} />)}
    </div>
    <div>보너스 !!</div>
    {bonus && <Ball number={bonus} />}
    {redo && <button onClick={onClickRedo}>한 번 더 !!</button>}
    </>
  )
}

export default Lotto;