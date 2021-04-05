import React, { useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { addMessage, addMessageMutation, getMessages, messageAddedSubscription, messagesQuery, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({user}) => {
  const {data} = useQuery(messagesQuery)
  const messages = data ? data.messages : []
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({client, subscriptionData}) => {
      client.writeData({data: {
        messages: messages.concat(subscriptionData.data.messageAdded)
      }})
    }
  })
  const [addMessage] = useMutation(addMessageMutation)
 
  
  // useEffect(() => {
  //   let subscription = null
    
  //   async function fetchMessage() {
  //     const msgs = await getMessages();
  //     setMessage(msgs);
      
  //     subscription = await onMessageAdded(message => {
  //       setMessage(m => [...m, message]);
  //     })
      
  //   }
  //   fetchMessage()

  //   return () => {
  //     if(subscription) {
  //       subscription.unsubscribe()
  //     }
  //   }
  // },[])

  const handleSend = async(text) => {
    await addMessage({variables: {input: {text}}})
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
