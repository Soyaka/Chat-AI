"use client"
 // Stiil a bug loading messages when changing from chat to another the meesages that displayed without refreach are too old are the messages that useeffect obtain from chat states

import React, { useEffect, useState } from 'react';
import {Snippet} from "@nextui-org/react";
import {CreateDocumentMessage} from '../API/main'
import Avatar from '../_Ext/Avatar'
import {Spinner} from "@nextui-org/react";
import {GetCompletionGBT} from '../API/openAI'
import { useSelector, useDispatch } from 'react-redux';
import { SetMessages } from './Actions';


const Content = () => {
  // Most used declarations
  const dispatch = useDispatch()
  const [InputContent , setInputContent] = useState() 
  const chosenChat = useSelector((state) => state.CSNChat);
  const chats = useSelector((state) => state.chats);
  const filtredchats = chats.filter(chat=> chat.chatID == chosenChat)
  const REDUXMESSAGES = useSelector((state) => state.messages)




  //#!! Must change  the logic for use efect to some logic that gets the data from database or something else except the chats array
  // the dummy useeffect to obtain data and parse it
  useEffect(()=>{
    if (filtredchats && filtredchats[0]) {
      const pureMessages = filtredchats[0].messages.map(message =>
        ({
          role: message.Role || message.role,
          content: message.content
        }))
      dispatch(SetMessages(pureMessages))
    }
  },[chosenChat])

  // Just a function to handle submited data for submition !! must add when the input area is empty Security leaks
  const HandleSubmit = async(e)=>{
    e.preventDefault();
    setInputContent('')

    const NewMSg = {
      role: 'user',
      content: InputContent
    }
        // Add user msg to database
    CreateDocumentMessage({
      ...NewMSg,
      chatID : chosenChat
    })

    // in this section i assign the return of dispatch to echo to use the updated content of messages
    const echo = dispatch(SetMessages([...REDUXMESSAGES ,NewMSg ]))
    const response = await GetCompletionGBT([...echo.payload])
    dispatch(SetMessages([...echo.payload,response ]))
    // Add assistant msg to database
    CreateDocumentMessage({
      ...response,
      chatID : chosenChat
    })

  }



    return (
      
     REDUXMESSAGES ? (
        <div className='text-black flex flex-col w-[80%] bg-slate-500 overfloaw-scroll'>
          {REDUXMESSAGES.map((msg, i) => (
            <div key={i*i*i} className='p-1 rounded m-1 '>
             {msg.Role || msg.role === 'user'?
              (
              <div key={i} className='flex flex-row gap-2 '>
                <Avatar role={msg.Role || msg.role}/>
                <Snippet hideSymbol={true} className='w-fit'  variant="shadow" size="lg" color="warning">
                  <p  className=' whitespace-normal' > {msg.content}</p>
                </Snippet>
              </div>
              )
                                          :
              <div key={i}  className='flex flex-row gap-2 '>
                <Avatar  role={msg.Role}/>
                <Snippet   hideSymbol={true} className='w-fit'  variant="shadow" size="lg" color="danger">
                    <p   className='w-[px] whitespace-normal' > {msg.content}</p>
                </Snippet>
              </div>
             }
            </div>
            
          ))}
          <form  onSubmit={e => HandleSubmit(e)} action="" className=' flex right-0 bottom-0 p-1  fixed h-[6em]  bg-slate-700 w-[80%] items-center justify-center'>
          <input  value={InputContent?InputContent:"" } onChange={(e)=>setInputContent(e.target.value)} type="text" placeholder="Type here" className="  input input-bordered input-info  w-[60em] border-none relative  h-[4em]  focus:outline-none" />
          </form>
        </div>
      ) :  <Spinner size="md" />
    );
    
};

export default Content;
