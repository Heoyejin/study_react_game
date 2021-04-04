import React, { PureComponent } from 'react';

class StateMessage extends PureComponent {

  onReset = () => {
    this.props.onReset([])
  }

  render () {
    const { result } = this.props;
    return (
      result.length === 0 ? null : 
        <>
          <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={this.onReset}>리셋</button>
        </>
    )
  }
}

export default StateMessage;