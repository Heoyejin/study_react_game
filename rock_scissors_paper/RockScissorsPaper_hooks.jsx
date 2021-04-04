import React, {useState, useRef, useEffect} from 'react';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px'
}
  
const scores = {
  rock: 1,
  scissor: 0,
  paper: -1
}
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
}

const RockScissorsPaper = () => {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const interval = useRef(null);

  // componentDidMount, componentWillUnmount와 비슷한 역할을 함
  // 두번째 인수에 넣은 값이 바뀌는 경우 useEffect가 실행 됨
  useEffect(() => {
    console.log("useEffect");
    interval.current = setInterval(changeHand, 100);
    // componentWillUnmount 역할
    return () => { 
      clearInterval(interval.current);
    }
  }, [imgCoord]);

  const onClickBtn = (choice) => () =>  {
    clearInterval(interval.current);
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = cpuScore - myScore;

    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore((prevScore) => {
        return prevScore + 1
      });
    } else {
      setResult('졌습니다.');
      setScore((prevScore) => {
        return prevScore - 1
      });
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  }

  const changeHand = () => {
    if (imgCoord == rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}

export default RockScissorsPaper;