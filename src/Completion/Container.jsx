// Container.jsx
import React, { useEffect, useState } from 'react';
import ChatsList from './ChatsList';
import Content from './Content';
import { ListChats } from '../API/main';
import { useSelector, useDispatch } from 'react-redux';
import {SetChats} from './Actions'


const Container = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ListChats();
        const chatsInfo = data.documents.map((chat) => ({
          chatID: chat.$id,
          createdAt: chat.$createdAt,
          name: chat.name,
          messages: chat.messages,
        }));
        dispatch(SetChats(chatsInfo))

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
      <div>
        <ChatsList />
        <Content/>
      </div>
  );
};

export default Container;
