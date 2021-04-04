import React, { memo } from 'react';

const StateMessage = memo(({result, onReset}) => {

  const onResetTo = () => {
    onReset([])
  }

  return (
    result.length === 0 ? null : 
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onResetTo}>리셋</button>
      </>
  )
})

export default StateMessage;