import React, {PureComponent} from 'react';

class Try extends PureComponent {
  constructor(props) {
    super(props);

    
    // 함수로 응용해서 사용가능
    const filtered = this.props.filter(() => {

    });
  }
  render() {
    return (
      <li>
        <b>{this.props.index + 1} 번 째 입력 (<span style={{color:'red'}}>{this.props.tryInfo.try}</span>)</b>
        <div>: {this.props.tryInfo.result}</div>
      </li>
    ) 
  }
}

export default Try;
