import React from 'react'

const Timer = (props) => {
  return (
    <div className='timer'>
    {props.status === 'enable' && (
      <span className='timerText'>Time left</span>)}
    {(props.status === 'enable' || props.status === 'start') && (
      <>
        <span className='timerCount'>{props.timer}</span>

        <span className='timerText'>seconds</span>
      </>)}
    {props.status === 'disable' && (
      <>
        <span className='Oops'>Oops, Time Up</span>

        <span className='timerText'>Check your results, and hit retry</span>
      </>)}
  </div>
  )
}

export default Timer