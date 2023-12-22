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
import Component from '../_Ext/CodeHighlighter'

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputContent('');

    const newMsg = {
      role: 'user',
      content: inputContent
    };

    CreateDocumentMessage({
      ...newMsg,
      chatID: chosenChat
    });

    const echo = dispatch(SetMessages([...reduxMessages, newMsg]));
    const response = await GetCompletionGBT([...echo.payload]);

    dispatch(SetMessages([...echo.payload, response]));
    CreateDocumentMessage({
      ...response,
      chatID: chosenChat
    });
  };

  return (
    reduxMessages ? (
      <div className='text-black flex flex-col w-[80%] bg-slate-500 overflow-scroll'>
        {reduxMessages.map((msg, i) => (
          <div key={i * i * i} className='p-1 rounded m-1 '>
            {msg.Role || msg.role === 'user' ? (
              <div key={i} className='flex flex-row gap-2 '>
                <Avatar role={msg.Role || msg.role} />
                <Snippet hideSymbol={true} className='w-fit' variant="shadow" size="lg" color="warning">
                  <p className='whitespace-normal'>{msg.content}</p>
                </Snippet>
              </div>
            ) : (
              <div key={i} className='flex flex-col gap-2 '>
                <Avatar role={msg.Role} />


                <Snippet hideSymbol={true} className='w-fit' variant="shadow" size="lg" color="danger">
                    { FindCode(msg.content).map(obj => obj.normal?
                       <p className='w-[px] whitespace-normal'>{obj.normal}</p>
                    : 
                    <SyntaxHighlighter language={findFirstWord(obj.code)} style={dark}>
                      {obj.code}
                    </SyntaxHighlighter>)}
                 

                </Snippet>




              </div>
            )}
          </div>
        ))}
        <form onSubmit={(e) => handleSubmit(e)} action="" className='flex right-0 bottom-0 p-1 fixed h-[6em] bg-slate-700 w-[80%] items-center justify-center'>
          <input value={inputContent ? inputContent : ""} onChange={(e) => setInputContent(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-info w-[60em] border-none relative h-[4em] focus:outline-none" />
        </form>
      </div>
    ) : <div>No Content</div>
  );
};

export default Content;
