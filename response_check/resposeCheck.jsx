import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: []
  }

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    // class를 사용할 때는 항상 구조 분해 하기 
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요!'
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭'
        });
        this.startTime = new Date();
      // 랜덤하게 1~3초 뒤에 변경되도록 함 
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') { // 성급하게 클릭한경우
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
      })
    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...prevState.result, this.endTime - this.startTime]
        }
      })
    }
  }

  // 리액트를 가독성 있게 짜는게 가장 어려움.. 이렇게 함수로 빼는게 그나마 나은것 같긴 한데 어쨌든 가독성이 떨어짐.
  renderAverage = () => {
    const { result } = this.state;
    // jsx에서 null, undefined, false 면 태그가 없다고 판단하기 때문에 삼항연산자 사용
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
        {this.renderAverage()}
      </>
    )
  }
}

export default ResponseCheck;