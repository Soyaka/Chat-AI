import React, { useEffect, useState } from 'react'
import { useChosenChat } from './ChosenChat.context'
import { useNavigate } from 'react-router-dom'
const ChatsList = ({Chats}) => {
  const chats = (Chats.reverse())
  const {chosenChat , toggleChosenChat} = useChosenChat()
  const navigate = useNavigate();

  useEffect(()=>{
    
  },[])

  const handleChosenChat = (choseNchat)=>{
    navigate(`${choseNchat}`)
    // toggleChosenChat(choseNchat)
    // console.log("hello",chosenChat, choseNchat)

  }
  
  return (
    <div>
      {chats && chats.map(chat=>
        <div onClick={()=>handleChosenChat(chat.chatID)}  key={chat.chatID} className='p-1 bg-zinc-500 text-white m-1 w-60 cursor-pointer hover:bg-slate-300 ' >
          {chat.name}
        </div>)
      }
    </div>
  )
}

export default ChatsList
