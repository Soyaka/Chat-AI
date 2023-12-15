import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ChangeChat} from './Actions'


const ChatsList = () => {
  const Chats = useSelector((state) => state.chats);
  const chats = (Chats.reverse())
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChosenChat = (choseNchat)=>{
    navigate(`${choseNchat}`)
    dispatch(ChangeChat(choseNchat))

  }
  
  return (
    <div>
      {chats && chats.map(chat=>
        <div onClick={()=>handleChosenChat(chat.chatID)}  key={chat.chatID}
             className='p-1 bg-zinc-500 text-white m-1 w-60 cursor-pointer hover:bg-slate-300 ' >
          {chat.name}
        </div>)
      }
    </div>
  )
}

export default ChatsList
