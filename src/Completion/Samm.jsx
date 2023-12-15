//StateManager 
import { createStore } from "redux";
const IntialState={
    CSNChat : '6578e0950d61e1ab9a2e',
    chats:[],
    messages:[]
}
// Reducer function Must be Completion Reducer
const ChatReducer =(state = IntialState, action)=>{
    switch(action.type){
        case  'CHOSENCHAT':
            return {CSNChat : action.payload }
        case  'CHATS':
            return {chats : action.payload }
        case  'MESSAGES':
            return {messages : action.payload }
        default:
            return state;
    }
};

export const store = createStore(ChatReducer)



// Actions.js

export const ChangeChat = (newchat )=>{
    return{
        type:"CHOSENCHAT",
        payload:newchat
    }
}
export const SetChats = (Chats)=>{
    return{
        type:"CHATS",
        payload:Chats
    }
}
export const SetMessages = (Messages)=>{
    return{
        type:"MESSAGES",
        payload:Messages
    }
}


// ////////////////////  ChatList ///////////////////
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';


const ChatsList = ({Chats}) => {
  const chats = (Chats.reverse())
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChosenChat = (choseNchat)=>{
    navigate(`${choseNchat}`)
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


// Container (parent)///////////////

import React, { useEffect, useState} from 'react'
import ChatsList from './ChatsList'
import { Provider } from 'react-redux';
import Content from './Content'
import { ListChats } from '../API/main'
import store from './StateManager'






const Container = ({match}) => {
    const [chats, setChats] = useState([])
    const CurrentChat = (chats.filter(chat => chat.chatID == ChosenChat))
    const CurrentMsgs = CurrentChat? CurrentChat.messages : []
    useEffect(() => {
        const getData = async () => {
            const data = await ListChats()
            const chatsInfo = await data.documents.map(chat => ({
                chatID: chat.$id,
                createdAt: chat.$createdAt,
                name: chat.name,
                messages: chat.messages
            }))
            setChats(chatsInfo)
        }

        getData()
    }, [])



    return (
        <Provider store={store}>
            <div>
                <ChatsList Chats={chats} />
                <Content chats={CurrentMsgs} />
            </div>
        </Provider>
    )
}

export default Container


// Content.jsx 
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import {SetMessages} from './Actions'

const Content = ({chats}) => {
  const ChosenChat = useSelector((state) => state.CSNChat);
  
  const [messages,setmessages] = useState()

  return (
    <div className='text-black'>
      {ChosenChat}
    </div>
  )
}

export default Content
