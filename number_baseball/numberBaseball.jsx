import React, { Component } from 'react';
import Try from './try';

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

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: []
  }
  
  // 이 화살표 함수는 함수를 bind(this)를 자동으로 해줌. 이렇게 안해주면 this가 undefined!! 
  onSubmitForm = (e) => {
    // 이렇게 사용하면 this.state를 비구조 할당으로 this.state를 생략하고 사용할 수 있음
    // const [result, value, tries] = this.state;
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런',
          value: '',
          // push를 쓰면 React에서 array가 변경되었는지 감지를 못함 -> render 함수 실행 안됨
          // const array1 = [];
          // const array2 = [...array1, 추가]
          tries: [...prevState.tries, { try: this.state.value, result: '홈런'}]
        }
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: []
      });
    } else {
      const answerArr = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9){
        this.setState({
          result: `기회를 모두 사용하였습니다. 정답은 ${this.state.anwer.join('')} 입니다!`
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: []
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArr[i] === this.state.answer[i]) strike += 1;
          else if (this.state.answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            value: '',
            tries: [...prevState.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]
          }
        })
      }
    }
  }

  input;

  onChangeInput = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    // 이렇게 사용하면 this.state를 비구조 할당으로 this.state를 생략하고 사용할 수 있음
    // const [result, value, tries] = this.state;
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}></input>
          {/* <button>입력</button> */}
        </form>
        <div>시도한 횟수: {this.state.tries.length}</div>
        <ul>
          {
            this.state.tries
            .map((v, i) => {
              // key를 고유한 값으로 지정해줘야함
              // value와 index가 React에서는 props라고 불림, key도 필수로 넣어줘야함
              return <Try key={v + i} tryInfo={v} index={i}></Try>
            })
            // map을 이런식으로 정의해서 바로 return 되도록도 사용가능 함.
            // map은 배열을 1:1로 짝지어 처리할 때 주로 사용함
            // .map((value, i) => 
            //   // key를 고유한 값으로 지정해줘야함 
            //   <li key={value.first}><b>{value.first}</b>{value.second} - {i}</li>
            // )}   
          }      
        </ul>
      </>
    )
  }
}

export default NumberBaseball;