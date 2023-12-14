import React, { useEffect, useState} from 'react'
import ChatsList from './ChatsList'
import Content from './Content'
import { ChosenChatProvider } from './ChosenChat.context'
import { ListChats } from '../API/main'






const Container = () => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await ListChats()
            const chatsInfo = await data.documents.map(chat => ({
                chatID: chat.$id,
                createdAt: chat.$createdAt,
                name: chat.name,
                messages: chat.messages
            }))
            setChats(chatsInfo)
        }

        getData()
    }, [])

    console.log(chats)

    return (
        <ChosenChatProvider>
            <div>
                <ChatsList Chats={chats} />
                <Content  />
            </div>
        </ChosenChatProvider>
    )
}

export default Container