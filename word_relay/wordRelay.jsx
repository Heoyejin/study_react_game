// 항상 react 선언하고 사용하기
const { Component } = require('react');

class WordRelay extends Component {
  state = {
    word: '호예진',
    value: '',
    result: ''
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        word: this.state.value,
        value: '',
        result: '딩동댕'
      });
    } else {
      this.setState({
        value: '',
        result: '땡'
      });
    }
    this.input.focus();
  }

  onChangeInput = (e) => {
    this.setState({value: e.target.value})
  }

  input;

  onRefInput = (c) => {
    this.input = c;
  }

  render() {
    return (
      <>
      <h1>{this.state.word}</h1>
      <form onSubmit={this.onSubmitForm}>
        <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}></input>
        <button>입력!</button>
      </form>
      <div>{this.state.result}</div>
      </>
    )
  }
}

// 이 파일에서 사용하는 컴포넌트를 외부에서도 사용할 수 있도록 해줌
module.exports = WordRelay;