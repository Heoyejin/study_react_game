import React, {Component} from 'react';

class NumberBaseball extends Component {

}

export const hello = 'hello'; // import { hello }
export const hi = 'hello'; // import { hello, hi }

export default NumberBaseball; // import NumberBaseball; 한번만 사용가능 
// module.exports랑은 다르지만 호환이 된다.. (?)

// node는 아래 문법만 지원하지만 babel을 사용하면 위의 ex2015문법도 지원 가능하다!
// const React = require('react');
// exports.hello = 'hello';
// module.exports = NumberBaseball;