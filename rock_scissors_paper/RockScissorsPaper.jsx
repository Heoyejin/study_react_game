import React, {Component} from 'react';

/* ------ 클래스의 생명 주기 ------
 * constructor -> render -> ref -> componentDidMount
 * -> {setState/props} 변경 시 -> shouldComponentUpdate(true) -> render -> componentDidUpdate
 * 부모가 나를 없앤 경우 -> componentWillUnmount
*/

class RockScissorsPaper extends Component {
  state = {
    result : '',  
    score : 0,
    imgCoord: 0
  }

  // 컴포넌트가 첫 랜더링된 후 발생
  componentDidMount() {

  }

  // 리 렌더링 후에 실행되는 함수 
  componentDidUpdate() {

  }

  // 컴포넌트가 제거되기 직전 발생
  componentWillUnmount() {

  }

  onClickBtn = ()=>  {

  }

  render() {
    const [result, score, imgCoord] = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RockScissorsPaper;