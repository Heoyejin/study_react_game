import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import NumberBaseball from '../number_baseball/numberBaseball';
import RSP from '../rock_scissors_paper/RockScissorsPaper_hooks';
import Lotto from '../lotto/lotto';

const Games = () => {

  return (
    <BrowserRouter>
    <div>
      {/* <a href=''>숫자야구</a> */}
      <Link to='/lotto'>로또</Link> &nbsp;
      <Link to='/rock_scissors_paper'>가위바위보</Link>
    </div>
    <div>
      <Route path='/number_baseball' component={NumberBaseball}></Route>
      <Route path='/rock_scissors_paper' component={RSP}></Route>
      <Route path='/lotto' component={Lotto}></Route>
    </div>
    </BrowserRouter>
  );
};

export default Games;