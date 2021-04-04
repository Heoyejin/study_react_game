import React, { memo, useState } from 'react';

const Try = memo(({tryInfo, index}) => {
  // 부모에 물려받은 props는 값을 변경하면 안되는게 원칙 !
  // 굳이 변경해야한다면 state로 선언해준 후에 값을 변경 해야함
  const [result, setResult] = useState(tryInfo.result);
  
  return (
    <li>
      <b>{index + 1} 번 째 입력 (<span style={{color:'red'}}>{tryInfo.try}</span>)</b>
      <div>: {tryInfo.result}</div>
    </li>
  ) 
});

export default Try;
