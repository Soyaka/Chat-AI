import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ChangeChat} from './Actions'


/**
 * ChatsList component renders a list of chats. 
 * It gets the chats array from the Redux store and reverses it to show latest chats first.
 * Renders each chat in the list with chat name and click handler to navigate to that chat.
 * Dispatches the ChangeChat action on click to update selected chat in Redux store.
*/
const ChatsList = () => {
  const Chats = useSelector((state) => state.chats);
  const chats = (Chats.reverse())
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChosenChat = (choseNchat) => {
    navigate(`${choseNchat}`)
    dispatch(ChangeChat(choseNchat))

  }

  return (
    <div className='flex flex-col bg-black p-2 laptop:w-[20%] desktop:w-[20%] h-screen pt-6 relative resize-x'>
      <div className='text-white p-4  w-[90%] bg-black top-0 right-0 ' > new chat</div>
      {chats && chats.map(chat =>
        <div onClick={() => handleChosenChat(chat.chatID)} key={chat.chatID}
          className=' w-[90%] text-slate-200 p-2 my-1 rounded bg-zinc-800 cursor-pointer hover:bg-zinc-700 duration-200 ' >
          {chat.name}
        </div>)
      }
    </div>
  )
}

export default ChatsList
