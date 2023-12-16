import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Snippet} from "@nextui-org/react";
import Avatar from '../_Ext/Avatar'
import {GetCompletionGBT} from '../API/openAI'
// import {CopyIcon} from "./CopyIcon";
// import {CheckIcon} from "./CheckIcon";

const Content = () => {
  const [messages, setmessages] = useState([])
  const [InputContent , setInputContent] = useState()
  const chosenChat = useSelector((state) => state.CSNChat);
  const chats = useSelector((state) => state.chats);
  let filtredchats = chats.filter(chat=> chat.chatID == chosenChat)

  useEffect(()=>{
    if (filtredchats && filtredchats[0]) {
      setmessages(filtredchats[0].messages);
    }
    console.log(chosenChat,messages)
  },[chosenChat])


  const HandleSubmit = async(e)=>{
    e.preventDefault();
    
    const NewMSg = {
      Role: 'user',
      content: InputContent
    }
    setInputContent('')
    setmessages( prevState => [...prevState, NewMSg])
    const NetMessages = messages?.map(msg =>({
      role: msg.Role || msg.role ,
      content: msg.content
    }))

    const response = await GetCompletionGBT(NetMessages)
    setmessages( prevState => [...prevState, response])
    console.log(response)
    console.log(NetMessages)

  }

    return (
      
      messages ? (
        <div className='text-black flex flex-col w-[80%] bg-slate-500 overfloaw-hidden'>
          {messages.map((msg, i) => (
            <div key={i*i*i} className='p-1 rounded m-1 '>
             {msg.Role === 'user'?
              (
              <div key={i} className='flex flex-row gap-2 '>
                <Avatar role={msg.Role}/>
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
          <input autoComplete='true' value={InputContent?InputContent:"" } onChange={(e)=>setInputContent(e.target.value)} type="text" placeholder="Type here" className="  input input-bordered input-info  w-[60em] border-none relative  h-[4em]  focus:outline-none" />
          </form>
        </div>
      ) : <>No content for the momont </>
    );
    
};

export default Content;
