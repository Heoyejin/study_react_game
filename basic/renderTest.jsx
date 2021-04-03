import React, {PureComponent} from 'react';

class RenderTest extends PureComponent {
  state = {
    counter: 0,
    string: 'hello',
    number: 1,
    boolean: true,
    // 단점은 object, array의 변경 여부를 파악하기 어려움 (ex) array.push)
    object: {},
    // 배열에 객체를 넣는 경우 변경되지 않아도 랜더링 되기 때문에 객체 형태는 사용하지 않는 것을 권장
    array: [ {} ]
  }

  onClick = () => {
    const array = this.state.array;
    // array.push(1);
    this.setState({
      array: [...array, 1]
    });
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