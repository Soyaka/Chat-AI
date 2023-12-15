
export const ChangeChat = (newchat) => {
    return {
      type: 'CHOSENCHAT',
      payload: newchat,
    };
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