const React = require('react');
const ReactDom = require('react-dom');

// const WordRelay = require('/word_relay/wordRelay_hooks');
// import NumberBaseball from './number_baseball/numberBaseball_hooks'; 
// import NumberBaseball from './number_baseball/numberBaseball'; 
// import RenderTest from './basic/renderTest';
// import ResponseCheck from './response_check/responseCheck';
// import ResponseCheck from './response_check/responseCheck_hooks';
import RockScissorsPaper from './rock_scissors_paper/RockScissorsPaper';

ReactDom.render(<RockScissorsPaper />, document.querySelector('#root'));