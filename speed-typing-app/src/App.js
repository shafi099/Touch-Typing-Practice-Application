import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';
import { Howl } from 'howler';
import './App.css'
import Contact from './Contact';
import sound from './soundPlay.mp3';
import Feedback from './Feedback'
// import contact from './Contact';
// const wordNums = 200;
// const seconds = 10;



function App() {
  const [wordNums, setWordNums] = useState(200);
  const [seconds, setSeconds] = useState(60);
  const [words, setWords] = useState([]);
  const [timer, setTimer] = useState(seconds);
  const [inputWord, setInputWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [charIndex, setCharIndex] = useState(-1);
  const [char, setChar] = useState('');
  const [inCorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState('start');

const play = () =>{
  new Audio(sound).play()
}


  const startTimer = () => {
    if (status === 'disable') {
      setWords(generateWords());
      setWordIndex(0);
      setCorrect(0);
      setInCorrect(0);
      setStatus('enable');
      setCharIndex(-1);
      setChar('');
    }

    if (status === 'start') {
      setStatus('enable');
      setWords(generateWords())
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

  // useEffect(() => {
  //   setWords(generateWords());
  // }, []);

  const generateWords = () => {
    const wordsArray = [];
    while (wordsArray.length < wordNums) {
      const randomWord = randomWords();
      wordsArray.push(randomWord);
    }
    return wordsArray;
  };

  const handleInput = (event) => {
    play();
    if (event.key === ' ') {
      checkMatch();
      setInputWord('');
      setWordIndex(wordIndex + 1);
      setCharIndex(-1);
      
    } else if (event.key === 'Backspace') {
      setCharIndex(charIndex - 1);
      setChar('');
      
    } else {
      setCharIndex(charIndex + 1);
      setChar(event.key);
      
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[wordIndex];
    const doesItMatch = wordToCompare === inputWord.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(inCorrect + 1);
    }
  };

  const getCharClass = (wordInd, CharInd, character) => {
    if (wordInd === wordIndex && CharInd === charIndex && char && status !== 'disable') {
      if (character === char) {
        return 'has-background-success';
      } else {
        return 'has-background-danger';
      }
    } else if (wordInd === wordIndex && charIndex >= words[wordIndex].length) {
      return 'has-background-danger';
    }
  };

  const numberChange = (event) => {
    const inputValue = event.target.value;
    setSeconds(inputValue);
    setTimer(inputValue);
  };

  const wordNumChange = (event) => {
    const wordValue = event.target.value;
    setWordNums(wordValue);
  };

  const handleStop = () =>{
    setStatus('disable');
            // clearInterval(time);
            setInputWord('');
  }

  return (
    <>
      <div className='topnav'>
        <span className='topnavtext'>
          <h6>W E L C O M E  T O , </h6>
          <span className='title'>word sprint</span>
        </span>
        <span>
          <Contact />
        </span>
      </div>


      <div className='timer'>
        {status === 'enable' && (
          <span className='timerText'>Time left</span>)}
        {(status === 'enable' || status === 'start') && (
          <>
            <span className='timerCount'>{timer}</span>

            <span className='timerText'>seconds</span>
          </>)}
        {status === 'disable' && (
          <>
            <span className='Oops'>Oops, Time Up</span>

            <span className='timerText'>Check your results, and hit retry</span>
          </>)}
      </div>
   

      {status === 'enable' && (
        <div className='inputSection'>
          <input placeholder='Type Here' disabled={status === 'disable'} type='text' onKeyDown={handleInput} value={inputWord} onChange={(event) => setInputWord(event.target.value)} />
        </div>

      )}



      {status === 'start' && (
        <div className='selectTimeWord'>
          <span>
            <span>Set countdown : </span>
            <input className='inputword' type='number' value={seconds} defaultValue={seconds} onChange={numberChange} />
          </span>
          <span>
            <span>Words Count : </span>
            <input className='inputword' type='number' defaultValue={wordNums} value={wordNums} onChange={wordNumChange} />
          </span>
        </div>
      )}


      {status === 'enable' && (
      <div className='randomWords'>
      {words.map((word, i) => (
        <span key={i}>
          {word.split('').map((char, idx) => (
            <span className={getCharClass(i, idx, char)} key={idx}>
              {char}
            </span>
          ))}
          <span> </span>
        </span>
      ))}
    </div>
    )}
    
{status ==='enable' && (
  <div className='buttonStop'>
  <button onClick={() => window.location.reload()}>click here to stop</button></div>

)}
      <div className='buttonStart'>
        {status === 'start' && (<>
          <span>Set countdown and number of words, then hit Start</span>
          <button onClick={() => startTimer()}>
            click to start
          </button></>
        )}
      
      </div>
    
      {status === 'disable' && (
        <div className='Result'>
        <div className='resultportion'>
          <p className='resultText'>Words Per Minute : </p>
          <p className='ResultValue'>{correct + inCorrect}</p>
        </div>
        <div className='resultportion'>
          <p  className='resultText'>Accuracy : </p>
          <p className='ResultValue'>{Math.round((correct / (correct + inCorrect)) * 100)}%</p>
        </div>
      </div>
      )}
         {status === 'disable' && (
        <div className='Result'>
        <div className='resultportion'>
          <p className='resultText'>Correct Words : </p>
          <p className='ResultValue'>{correct}</p>
        </div>
        <div className='resultportion'>
          <p  className='resultText'>Incorrect words : </p>
          <p className='ResultValue'>{inCorrect}</p>
        </div>
      </div>
      )}
        {status === 'disable' && (
          <div className='buttonRetry'>
          <button onClick={() => window.location.reload()}>click here to retry</button></div>
        
        )}
         {(status === 'start' || status === 'disable') && (<>
        <div className='created'>
        <a href='https://shafi-portfolio.netlify.app/' target='_blank' rel="noopener noreferrer"><span>© by Shafi Shaik</span></a>
</div>
  
</>
)}
      {status==='start' && (

<div className='about'>
<p>
Word Sprint is a fun and interactive game that tests your typing speed and accuracy. The objective of the game is to type a series of words as quickly and accurately as possible within a specified time limit. It's a great way to improve your typing skills, enhance your speed, and challenge yourself to become a faster typist.

</p>
<p>
    So, get ready to test your typing skills, challenge yourself, and have fun with the Speed Typing Game!
  </p></div>
      )}
     
        
    {status==='start' && (
 <div className='HowToPlay'>

 
 <p>
   How to Play:
   <ol>
     <li>Start the Game: When you start the game, you will see a countdown timer and a random set of words displayed on the screen.</li>
     <li>Typing Words: Begin typing the displayed words as fast as you can. Each word should be entered without any errors and followed by a space.</li>
     <li>Accuracy and Speed: The game will track your typing accuracy and speed. Correctly typed words will increase your score, while incorrect entries will count as errors.</li>
     <li>Time Limit: The game has a specific time limit within which you need to type as many words as possible. Try to complete as many words as you can before the timer runs out.</li>
     <li>Feedback and Results: After the game ends, you will receive feedback on your performance. This includes your words per minute (WPM) score and accuracy percentage.</li>
     <li>Retry: If you want to improve your score or challenge yourself again, you can retry the game and aim for a higher WPM and better accuracy.</li>
   </ol>
 </p>

</div>
    )}
       
{status === 'disable' && (
  <div className='HowToPlay'>
<p>
    Tips for Success:
    <ul>
      <li>1.Focus on accuracy: It's better to type accurately than to make errors in an attempt to type quickly. Accuracy is key.</li>
      <li>2.Practice regularly: The more you practice, the better you'll become. Regularly playing the speed typing game can significantly improve your typing skills over time.</li>
      <li>3.Use all fingers: Utilize proper typing techniques and try to use all your fingers to type. This will help you type faster and more efficiently.</li>
      <li>4.Maintain a good posture: Sit upright and maintain a comfortable typing posture to avoid any discomfort or strain while typing.</li>
    </ul>
  </p>
 </div>
)}

  <Feedback/>
    </>
  );
  
}

export default App;
