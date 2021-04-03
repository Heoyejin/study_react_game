import React from 'react';

const Try = ({tryInfo, index}) => {
  return (
    <li>
      <b>{index + 1} 번 째 입력 (<span style={{color:'red'}}>{tryInfo.try}</span>)</b>
      <div>: {tryInfo.result}</div>
    </li>
  ) 
};

export default Try;
