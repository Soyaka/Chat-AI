
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ChangeChat} from './Actions'


/**
 * ChatsList component renders a list of chats. 
 * It gets the chats array from the Redux store and reverses it to show latest chats first.
 * Renders each chat in the list with chat name and click handler to navigate to that chat.
 * Dispatches the ChangeChat action on click to update selected chat in Redux store.
*/
const ChatsList = () => {
  const Chats = useSelector((state) => state.chats);
  const chats = (Chats.reverse())
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChosenChat = (choseNchat) => {
    dispatch(ChangeChat(choseNchat))
    navigate(`${choseNchat}`)
    

  }
    
  return (
    <div className='😅'>
      <div className='😋' > new chat</div>
      {chats && chats.map(chat =>
        <div onClick={() => handleChosenChat(chat.chatID)} key={chat.chatID}
          className='🤩' >
          {chat.name}
        </div>)
      }
    </div>
  )
}
export default ChatsList
