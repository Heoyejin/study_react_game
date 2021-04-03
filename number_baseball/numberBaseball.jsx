import React, { Component } from 'react';

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
          {[['a','b'], ['c', 'd'], ['e', 'f'], ['g', 'h'], ['i', 'j']].map((value) => {
            return <li><b>{value[0]}</b>{value[1]}</li>
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball;