import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Snippet} from "@nextui-org/react";
import Avatar from '../_Ext/Avatar'
// import {CopyIcon} from "./CopyIcon";
// import {CheckIcon} from "./CheckIcon";

const Content = () => {
  const [messages, setmessages] = useState([])
  const [InputCntent , setInputContent] = useState()
  const chosenChat = useSelector((state) => state.CSNChat);
  const chats = useSelector((state) => state.chats);
  let filtredchats = chats.filter(chat=> chat.chatID == chosenChat)

  useEffect(()=>{
    if (filtredchats && filtredchats[0]) {
      setmessages(filtredchats[0].messages);
    }
    console.log(chosenChat,messages, InputCntent)
  },[chosenChat])
  

    return (
      
      messages ? (
        <div className='text-black flex flex-col w-[80%] bg-slate-500 overfloaw-hidden'>
          {messages.map((msg, i) => (
            <div className='p-1 rounded m-1 '>
             {msg.Role === 'user'?
              (
              <div  className='flex flex-row gap-2 '>
                <Avatar role={msg.Role}/>
                <Snippet hideSymbol={true} className='w-fit'  variant="shadow" size="lg" color="warning">
                  <p key={i} className=' whitespace-normal' > {msg.content}</p>
                </Snippet>
              </div>
              )
                                          :
              <div  className='flex flex-row gap-2 '>
                <Avatar role={msg.Role}/>
                <Snippet hideSymbol={true} className='w-fit'  variant="shadow" size="lg" color="danger">
                    <p key={i}  className='w-[px] whitespace-normal' > {msg.content}</p>
                </Snippet>
              </div>
             }
            </div>
            
          ))}
          <form action="" className=' flex right-0 bottom-0 p-1  fixed h-[6em]  bg-slate-700 w-[80%] items-center justify-center'>
          <input onChange={(e)=>setInputContent(e.target.value)} type="text" placeholder="Type here" className="  input input-bordered input-info  w-[60em] border-none relative  h-[4em]  focus:outline-none" />
          </form>
        </div>
      ) : <>No content for the momont </>
    );
    
};

export default Content;
