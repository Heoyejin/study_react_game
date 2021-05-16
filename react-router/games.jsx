import React from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import GameMatcher from './game_matcher';

const Games = () => {

  return (
    <BrowserRouter>
    <div>
      {/* <a href=''>숫자야구</a> */}
      <Link to="/game/lotto?query=10&hello=yejin">로또</Link> &nbsp;
      <Link to='/game/rock_scissors_paper'>가위바위보</Link> &nbsp;
      <Link to='/game/number_baseball'>숫자야구</Link> &nbsp;
      <Link to='/game/index'>게임 매쳐</Link>
    </div>
    <div>
      {/* <Route path='/game/:name' component={GameMatcher}></Route> */}
      {/* GameMatcher로 props 넘기기  */}
      {/* <Route path='/game/:name' component={() => <GameMatcher props="123456"/>}></Route> */}
      {/* Switch는 내부에 있는 컴포넌트 중 공통된 게 있으면 일치하는 첫번째 컴포넌트만 출력함 */}
      <Switch>
      <Route path='/game/:name' render={(props) => <GameMatcher {...props}/>}></Route>
      {/* 아래 주소처럼 /game/mineSearch 이런식의 주소는 / 주소도 일치한다고 생각하기 때문에 exact를 사용*/}
      <Route exact path='/' render={(props) => <GameMatcher {...props}/>}></Route>
      <Route path='/game/mineSearch' render={(props) => <GameMatcher {...props}/>}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
};

export default Games;