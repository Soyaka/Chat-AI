// store.js
import { createStore } from 'redux';

const initialState = {
  CSNChat: '6578e0950d61e1ab9a2e',
  chats: [],
  messages: []
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHOSENCHAT':
      return { ...state, CSNChat: action.payload };
    case 'CHATS':
      return { ...state, chats: action.payload };
    case 'MESSAGES':
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

const store = createStore(chatReducer);

export default store; // Ensure you have a clear default export here
