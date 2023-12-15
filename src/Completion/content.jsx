import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Content = () => {
  const [messages, setmessages] = useState()
  const chosenChat = useSelector((state) => state.CSNChat);
  const chats = useSelector((state) => state.chats);
  const filtredchats = chats.filter(chat=> chat.chatID == chosenChat) 

  useEffect(()=>{
    filtredchats && setmessages(filtredchats[0].messages)
    console.log(chosenChat)
  },[chosenChat])
  

    return (
      
      messages ? (
        <div className='text-black'>
          {messages.map((msg, i) => (
            <div key={i}>{msg.content}</div>
          ))}
        </div>
      ) : <>No content for the momont </>
    );
    
};

export default Content;
