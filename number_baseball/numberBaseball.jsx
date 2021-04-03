import React, { Component } from 'react';
import Try from './try';

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    // answer: getNumbers(),
    tries: []
  }

  onSubmitForm = (e) => {
    this.setState({
      // result: this.state.value'스트라이크' + + '볼',

    });
  }

  input;

  onChangeInput = (e) => {
    // input.
  }

  alpabat = [
    {first: 'a',second: 'b'}, 
    {first:'c', second:'d'}, 
    {first:'e', second:'f'}, 
    {first:'g', second:'h'}, 
    {first:'i', second:'j'}
  // 이런 식으로 i인자도 사용할 수 있음. key를 
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}></input>
          {/* <button>입력</button> */}
        </form>
        <div>남은 횟수: {this.state.tries.length}</div>
        <ul>
          {
            this.alpabat
            .map((value, i) => {
              // key를 고유한 값으로 지정해줘야함
              // value와 index가 React에서는 props라고 불림, key도 필수로 넣어줘야함
              return <Try key={value.first + i} value={value} index={i}></Try>
            })
            // map을 이런식으로 정의해서 바로 return 되도록도 사용가능함
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