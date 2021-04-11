const React = require('react');
const ReactDom = require('react-dom');

// const WordRelay = require('/word_relay/wordRelay_hooks');
// import NumberBaseball from './number_baseball/numberBaseball_hooks'; 
// import NumberBaseball from './number_baseball/numberBaseball'; 
// import RenderTest from './basic/renderTest';
// import ResponseCheck from './response_check/responseCheck';
// import ResponseCheck from './response_check/responseCheck_hooks';
// import RockScissorsPaper from './rock_scissors_paper/RockScissorsPaper';
// import RockScissorsPaper from './rock_scissors_paper/RockScissorsPaper_hooks';
// import Lotto from './lotto/lotto_hooks';
// import TicTacToe from './tictactoe/ticTacToe';
// import MineSearch from './mineSearch/mineSearch';
import Games from './react-router/games';

ReactDom.render(<Games />, document.querySelector('#root'));