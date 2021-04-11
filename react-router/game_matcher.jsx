import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class GameMatcher extends Component {
  render() {
    console.log(this.props);
    return (
      <div>게임매처</div>
    )
  }
}

// Router 같은 컴포넌트를 사용하지 않는 경우 this.props에 Link로 설정된 컴포넌트 경로들이 없는 경우 withRouter를 사용함
// export default withRouter(GameMatcher);
export default GameMatcher;