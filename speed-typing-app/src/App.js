import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';

const wordNums = 200;
const seconds = 10;

function App() {
  const [words, setWords] = useState([]);
  const [timer, setTimer] = useState(seconds);
  const [inputWord, setInputWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [charIndex, setCharIndex]=useState(-1)
  const [char,setChar]=useState('')
  const [inCorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState('start');

  const startTimer = () => {
    if (status === 'disable') {
      
      setWords(generateWords());
      setWordIndex(0);
      setCorrect(0);
      setInCorrect(0);
      setStatus('enable')
      setCharIndex(-1)
      setChar('')
    }


    if (status === 'start') {
      setStatus('enable');
      let time = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setStatus('disable');
            clearInterval(time);
            setInputWord('');
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
  };

  useEffect(() => {
    setWords(generateWords());
  }, []);

  const generateWords = () => {
    return new Array(wordNums).fill(null).map(() => randomWords());
  };

  const handleInput = (event) => {
    console.log(event.key)
    if (event.key === ' ') {
      console.log(event.key)
      checkMatch();
      setInputWord('');
      setWordIndex(wordIndex + 1);
      setCharIndex(-1);
    }
    else if(event.key==='Backspace'){
      setCharIndex(charIndex-1)
      setChar('')
    }
    else{
      setCharIndex(charIndex+1)
      setChar(event.key)
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[wordIndex];
    const doesItMatch = wordToCompare === inputWord.trim();
    console.log(doesItMatch);
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(inCorrect + 1);
    }
  };

  // const HandleRetry = () => {
  //   setStatus('start')
  //   startTimer()
  // }
const getCharClass= (wordInd, CharInd,character)=>{
  if(wordInd == wordIndex  && CharInd == charIndex && char && status!='disable'){
    if (character==char){
      return 'has-background-success'
    }
    else{
      return 'has-background-danger'
    }
  }else if(wordInd===wordIndex && charIndex>=words[wordIndex].length){
    return 'has-background-danger'
  }

}


  return (
    <div className="App">
      <div className='section'>
        <div className='is-size-1 has-text-centered has-text-primary'>
          <h2>{timer}</h2>
        </div>
      </div>
      <div className='control is-expanded section'>
        <input disabled={status === 'disable'} type='text' className='input' onKeyDown={handleInput} value={inputWord} onChange={(event) => setInputWord(event.target.value)} />
      </div>
      <div className='section'>

       {status ==='start' && (
        <button className='button is-false is-fullwidth' onClick={() => startTimer()}>
          Start
        </button>
       )} 

{status ==='disable' && (
        <button className='button is-false is-fullwidth' onClick={() =>  window.location.reload()}>
          Retry
        </button>
       )} 

      </div>
      {status === 'enable' && (
        <div className='section'>
          <div className='card'>
            <div className='card-content'>
              <div className='content'>
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split('').map((char, idx) => (
                        <span className={getCharClass(i,idx,char)} key={idx}>{char}</span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'disable' && (
        <div className='section'>
          <div className='columns'>
            <div className='column has-text-centered'>
              <p className='is-size-5'>Words Per Minute:</p>
              <p className='has-text-primary is-size-1'>{correct + inCorrect}</p>
            </div>
            <div className='column has-text-centered'>
              <p className='is-size-5'>Accuracy:</p>
              <p className='has-text-primary is-size-1'>{Math.round((correct / (correct + inCorrect)) * 100)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
