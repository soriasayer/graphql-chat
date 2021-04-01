import React, { useEffect, useState } from 'react';
import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({user}) => {
  const [messages, setMessage] = useState([])
  
  useEffect(() => {
    let subscription = null
    
    async function fetchMessage() {
      const msgs = await getMessages();
      setMessage(msgs);
      
      subscription = await onMessageAdded(message => {
        setMessage(m => [...m, message]);
      })
      
    }
    fetchMessage()

    return () => {
      if(subscription) {
        subscription.unsubscribe()
      }
    }
  },[])

  const handleSend = async(text) => {
    await addMessage(text);
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );  
}

export default Chat;
