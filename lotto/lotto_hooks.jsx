import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
  // useMemo: 복잡한 함수 결과 값(함수의 return 값)을 기억함, useRef: 일반 값을 기억함
  // Hooks에서 조건문, 반복문(순서가 확실히 정해진 반복문만 가능) 안에서 선언해주면 안되고 무조건 최상위에서 선언, 선언되는 순서도 중요함
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), [winNumbers]); // 두번 째 인자가 바뀔 때만 다시 실행됨
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  
  // const mounted = useRef(false);
  // useEffect(() => {
  //   if(!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     // 이렇게 작업 하면 componentDidUpdate 와 똑같이 쓸 수 있음.
  //   }
  // }, [원하는 값]);
  
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
  
  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  }, [winNumbers]);

  // useCallback은 함수 자체를 기억함
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo", winNumbers);
    setWinNumbers(getWinNumbers());  // 당첨 숫자들
    setWinBalls([]);
    setBonus(null); // 보너스 공
    setRedo(false)
    // 여기서 timeouts.current가 변경됨
    timeouts.current = [];
  }, [winNumbers]) // 

  return (
    <>
    <div>당첨 숫자</div>
    <div id="result">
      {winBalls.map((v, i) => <Ball key={v + i} number={v} />)}
    </div>
    <div>보너스 !!</div>
    {/* 자식 컴포넌트에 함수를 전달해주는 경우 useCallback을 무조건 사용해줘야함 */}
    {bonus && <Ball number={bonus} onClick={onClickRedo}/>}
    {redo && <button onClick={onClickRedo}>한 번 더 !!</button>}
    </>
  )
}

export default Lotto;