import React, {useRef, useEffect, useState } from 'react';
import { Snippet } from "@nextui-org/react";
import uniqueID from 'soyaka-id'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Avatar } from '@nextui-org/react';
import { CreateDocumentMessage, ListChats } from '../API/main';
import { GetCompletionGBT } from '../API/openAI';
import { useSelector, useDispatch } from 'react-redux';
import { findFirstWord } from '../../parse';
import { SetMessages } from './Actions';
import { FindCode } from '../../parse';

 //OPTIMIZE: Fix the relay  its soo slow

const Content = () => {
 
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const chosenChat = useSelector((state) => state.CSNChat);
  const reduxMessages = useSelector((state) => state.messages);
  

    const fetchMessages = async () => {
    try {
      const { documents } = await ListChats();
      const { messages } = documents.find((chat) => chat.$id === chosenChat) || {};
      const pureMsgs = messages?.map(({ Role, role, content }) => ({ role: Role || role, content }));
      dispatch(SetMessages(pureMsgs));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }; 

  useEffect(() => {
    
    fetchMessages();
  }, [chosenChat,reduxMessages]);


  return (
    reduxMessages ? (
      <div ref={scrollContainerRef} className='😍'>
        {reduxMessages.map((msg, i) => (
          <div  key={uniqueID()} className='p-1 rounded m-1  '>
            {msg.Role || msg.role === 'user' ? (
              <div key={i} className='flex flex-row gap-2 right-0'>
                <Avatar role={msg.Role || msg.role} />
                <Snippet hideSymbol={true} className='w-fit  laptop:max-w-[67em]' variant="shadow" size="lg" color="warning">
                  <p className='whitespace-normal'>{msg.content}</p>
                </Snippet>
              </div>
            ) : (
              <div key={i} className='flex flex-row gap-2   '>
                <Avatar role={msg.Role} />
                <Snippet hideSymbol={true} className=' w-fit laptop:max-w-[67em] ' variant="shadow" size="lg" color="danger">
                    { FindCode(msg.content).map(obj => obj.normal?
                       <p key={uniqueID()} className='w-[px] whitespace-normal'>{obj.normal}</p>
                    : 
                    <SyntaxHighlighter key={uniqueID()} className=" laptop:max-w-[55em]" language={findFirstWord(obj.code)} style={dark}>
                      {obj.code}
                    </SyntaxHighlighter>)}
                </Snippet>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : <div>No Content</div>
  );
};

export default Content;
