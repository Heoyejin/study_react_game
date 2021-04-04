import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: []
  }
  onClickScreen = () => {

  }

  // 리액트를 가독성 있게 짜는게 가장 어려움.. 이렇게 함수로 빼는게 그나마 나은것 같긴 한데 어쨌든 가독성이 떨어짐.
  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
  }

  render () {
    const { state, message } = this.state;
    return (
      <>
        <div
          id='screen'
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        {/* 리액트에서 조건문은 삼항연산자, &&, || 연산자를 사용함 */}
        {/*result.length === 0 ? null : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>*/}
        {this.renderAverage}
      </>
    )
  }
}

export default ResponseCheck;