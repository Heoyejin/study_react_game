import React, {Component} from 'react';
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),  // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false
  };

  timeouts = [];

  runtimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true
      });
    }, 7000);
  }

  componentDidMount() {
    this.runtimeouts();
  }
  
  // 어떤 것이 바뀌었는지 판단 가능
  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length == 0) {
      this.runtimeouts();
    }
  }
  
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),  // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false
    });
    this.timeouts = [];
  }

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