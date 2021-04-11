import React from 'react';
import { HashRouter, Route, Link} from 'react-router-dom';
import NumberBaseball from '../number_baseball/numberBaseball';
import RSP from '../rock_scissors_paper/RockScissorsPaper_hooks';
import Lotto from '../lotto/lotto';
import GameMatcher from './game_matcher';

const Games = () => {

  return (
    <HashRouter>
    <div>
      {/* <a href=''>숫자야구</a> */}
      <Link to='/game/lotto'>로또</Link> &nbsp;
      <Link to='/game/rock_scissors_paper'>가위바위보</Link>
      <Link to='/game/index'>게임 매쳐</Link>
    </div>
    <div>
      <Route path='/game/:name' component={GameMatcher}></Route>
    </div>
    </HashRouter>
  );
};

export default Games;