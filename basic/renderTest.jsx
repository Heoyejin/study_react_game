import React, {Component} from 'react';

class RenderTest extends Component {
  state = {
    counter:0
  }

  // 지금 까지 만들어온 예제들은 변경되는 부분만 랜더링 하는 방식이 아니라 전체를 랜더링함
  // 이런 이슈를 해결하기 위해서 아래 함수로 랜더링 할 부분을 핸들링 해줘야함
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter != nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({});
  }

  render () {
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}

export default RenderTest;