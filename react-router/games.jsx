import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import NumberBaseball from '../number_baseball/numberBaseball';
import RSP from '../rock_scissors_paper/RockScissorsPaper';
import Lotto from '../lotto/lotto';

const Games = () => {

  return (
    <BrowserRouter>
      <div>
        <Route path='/number-baseball' component={NumberBaseball}></Route>
        <Route path='/rock-scissors-paper' component={RSP}></Route>
        <Route path='/lotto-generator' component={Lotto}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;