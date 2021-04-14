import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import GameMatcher from './game_matcher';

const Games = () => {

  return (
    <BrowserRouter>
    <div>
      {/* <a href=''>숫자야구</a> */}
      <Link to="/game/lotto?query=10&hello=yejin">로또</Link> &nbsp;
      <Link to='/game/rock_scissors_paper'>가위바위보</Link> &nbsp;
      <Link to='/game/index'>게임 매쳐</Link>
    </div>
    <div>
      <Route path='/game/:name' component={GameMatcher}></Route>
    </div>
    </BrowserRouter>
  );
};

export default Games;