const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./word_relay/wordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));