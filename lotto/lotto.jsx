import React, {Component} from 'react';
import Ball from './Ball';

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) { 
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),  // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false
  };

  render() {
    const {winBalls, bonus, redo} = this.state;
    return (
        <>
        <div>당첨 숫자</div>
        <div id="result">
        {/* {winBalls.map((v) => <Ball key={v} number={v} />)} */}
          {winBalls.map((v, i) => <Ball key={v + i} number={v} />)}
        </div>
        <div>보너스 !!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더 !!</button>}
        </>
    )
  }
}

export default Lotto;