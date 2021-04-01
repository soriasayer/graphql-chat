import React, { useState } from 'react';

const MessageInput = ({onSend}) => {
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSend(event.target.value);
      event.target.value = '';
      setMessage('')
    }
  }

  const handleClick = () => {
    console.log(message)
    onSend(message);
    setMessage('')
  }

  return (
    <div className="box">
      <p className="control" style={{display: 'flex'}}>
        <input className="input" type="text" placeholder="Say something..."
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress} />
          <button style={{
            background: '#00d1b2',
            borderRadius: 4,
            border: 'none',
            marginLeft: 5}} onClick={handleClick}>Send</button>
      </p>
    </div>
  );
}

export default MessageInput;
