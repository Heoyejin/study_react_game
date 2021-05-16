import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import RSP from '../rock_scissors_paper/RockScissorsPaper_hooks';
import Lotto from '../lotto/lotto';
import NumberBaseball from '../number_baseball/numberBaseBall_hooks';

class GameMatcher extends Component {
  render() {
    console.log(this.props);
    let urlParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlParams.get('hello'));
    if (this.props.match.params.name === "rock_scissors_paper") {
      return <Lotto></Lotto>;
    } else if (this.props.match.params.name === "lotto") {
      return <RSP></RSP>
    } else if (this.props.match.params.name === "number_baseball") {
      return <NumberBaseball></NumberBaseball>
    } 
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    )
  }
}

// history.pushState는 브라우저의 API이다.
// React에도 this.props에 history API가 있는데 두 API는 모두 실제 url을 바꿔주는 거임. 근데 React에서는 this.props의 API를 사용하기

// Router 같은 컴포넌트를 사용하지 않는 경우 this.props에 Link로 설정된 컴포넌트 경로들이 없는 경우 withRouter를 사용함
// export default withRouter(GameMatcher);
export default GameMatcher;