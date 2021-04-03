const React = require('react');
const ReactDom = require('react-dom');

// const WordRelay = require('/word_relay/wordRelay_hooks');
import NumberBaseball from './number_baseball/numberBaseball_hooks'; 
// import NumberBaseball from './number_baseball/numberBaseball'; 
// import RenderTest from './basic/renderTest';

ReactDom.render(<NumberBaseball />, document.querySelector('#root'));