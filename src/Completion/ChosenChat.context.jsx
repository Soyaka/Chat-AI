// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a Context
const ChosenChatContext = createContext();

// Step 2: Create a Provider component
export const ChosenChatProvider = ({ children }) => {
  // State to manage the theme
  const [ChosenChat, setChosenChat] = useState('');

  // Function to toggle the theme
  const toggleChosenChat = (value) => {
    setChosenChat(value);
  };

  // Step 3: Provide the context value to the children
  return (
    <ChosenChatContext.Provider value={{ ChosenChat, toggleChosenChat }}>
      {children}
    </ChosenChatContext.Provider>
  );
};

// Step 4: Create a custom hook for consuming the context
export const useChosenChat = () => {
  const context = useContext(ChosenChatContext);
  if (!context) {
    throw new Error('The Provider has some rhing diif in his mind');
  }
  return context;
};
