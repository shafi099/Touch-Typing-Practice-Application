import React from 'react';
import linkedin from '../pics/linkedin.png';
import github from '../pics/github.png';
import mail from '../pics/mail.png';

const Contact = () => {
  return (
    <>
      <div className="contacticonportion">
        <a href="mailto:shaikshafieluru@gmail.com" target='_blank' rel="noopener noreferrer"><img src={mail} className='contacticon' alt="Gmail_icon"></img></a>
        <a href="https://www.linkedin.com/in/shaik-shafi-eluru/" target='_blank' rel="noopener noreferrer"><img src={linkedin} className='contacticon' alt="linkedIn_icon"></img></a>
        <a href="https://github.com/shafi099" target='_blank' rel="noopener noreferrer"><img src={github} className='contacticon' alt="github_icon"></img></a>
      </div>
    </>
  );
}

export default Contact;

