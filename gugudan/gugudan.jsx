// 항상 react 선언하고 사용하기
const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {
    // 컴포넌트 안에 다음과 같이 선언해서
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    // ref는 useRef를 이용해서 접근
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
        // Hooks에서도 이전 함수 형태로 정의해서 변경 전 state를 활용할 수 있음.
        setResult((prevResult) => {
            // return '정답' + value
            return '정답' + prevResult
        });
        setFirst(Math.ceil(Math.random() * 9));
        setSecond(Math.ceil(Math.random() * 9));
        setValue('');
        inputRef.current.focus();
        } else {
        setValue('');
        setResult('땡');
        inputRef.current.focus();
        }
    };

    return (
        <>
        <div>{fisrt}곱하기{second}는?</div>
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} type='number' value={value} onChange={onChangeInput} />
            <button>입력@</button>
        </form>
        <div>{result}</div>
        </>)
    }
// 이 파일에서 사용하는 컴포넌트를 외부에서도 사용할 수 있도록 해줌
module.exports = GuGuDan;