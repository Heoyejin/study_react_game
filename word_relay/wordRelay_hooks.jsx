// 항상 react 선언하고 사용하기
const React = require('react');
const {useState, useRef} = React;

const WordRelay = () => {
  const [word, setWord] = useState('호예진');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue('');
      setResult('딩동댕');
    } else {
      setValue('');
      setResult('땡');
    }
    inputRef.current.focus();
  }
  
  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  }

  return (
    <>
    <h1>{word}</h1>
    <form onSubmit={onSubmitForm}>
      <label htmlFor='wordInput'>글자를 입력하세요 </label>
      <input id='wordInput' className='wordInput'  ref={inputRef} value={value} onChange={onChangeInput}></input>
      <button>입력!</button>
    </form>
    <div>{result}</div>
    </>
  )
}

// 이 파일에서 사용하는 컴포넌트를 외부에서도 사용할 수 있도록 해줌
module.exports = WordRelay;