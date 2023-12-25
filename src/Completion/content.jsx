import React, { useEffect, useState } from 'react';
import { Snippet } from "@nextui-org/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Avatar } from '@nextui-org/react';
import { CreateDocumentMessage, ListChats } from '../API/main';
import { GetCompletionGBT } from '../API/openAI';
import { useSelector, useDispatch } from 'react-redux';
import { findFirstWord } from '../../parse';
import { SetMessages } from './Actions';
import { FindCode } from '../../parse';

const Content = () => {
  const dispatch = useDispatch();
  const [inputContent, setInputContent] = useState('');
  const chosenChat = useSelector((state) => state.CSNChat);
  const reduxMessages = useSelector((state) => state.messages);
  
  const fetchMessages = async () => {
    const data = await ListChats();
    const body = data.documents.find(chat => chat.$id === chosenChat);
    const pureMsgs = body.messages?.map(msg => ({
      role: msg.Role || msg.role,
      content: msg.content
    }));
    dispatch(SetMessages(pureMsgs));
  };

  useEffect(() => {
    fetchMessages();
  }, [chosenChat]);

 
  return (
    reduxMessages ? (
      <div className='😍'>
        {reduxMessages.map((msg, i) => (
          <div key={i * i * i} className='p-1 rounded m-1  '>
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
                       <p className='w-[px] whitespace-normal'>{obj.normal}</p>
                    : 
                    <SyntaxHighlighter className=" laptop:max-w-[55em]" language={findFirstWord(obj.code)} style={dark}>
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
