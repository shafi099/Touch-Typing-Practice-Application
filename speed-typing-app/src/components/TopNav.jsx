import React from 'react'
import Contact from './Contact'

const TopNav = () => {
  return (
    <div className='topnav'>
    <span className='topnavtext'>
      <h6>W E L C O M E  T O , </h6>
      <span className='title'>word sprint</span>
    </span>
    <span class='removeContact'>
      <Contact />
    </span>
  </div>
  )
}

export default TopNav