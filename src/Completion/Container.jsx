import React, { useEffect, useState } from 'react'
import ChatsList from './ChatsList'
import Content from './Content'
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
        <div>
            <ChatsList chats={chats} />
            <Content />
        </div>
    )
}

export default Container