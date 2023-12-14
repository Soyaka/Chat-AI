import { databases , client } from './appwrite.js';
import { ID } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';


//---------------------------------------------------------------
//@List All Chats from the database tested 1.0
export async function ListChats(){
    try {
        const chats = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLECTION_ID_CHATS)
        // const lats = chats.documents.map(chat =>({
        //     name : chat.name,
        //     id: chat.$id,
        //     createdAt : chat.$createdAt
        // }))
        return chats
        
    } catch (error) {
        return error
    }
}
//----------------------------------------------------------------







//----------------------------------------------------------------
//@ List The Messages of a specific Chat //Tested 1.0
export async function GetchatMesssages (chatID){
    try {
        const response = await databases.getDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLECTION_ID_CHATS, chatID)
        const MSGS =  response.messages?.map(message =>({
            role: message.Role,
            content: message.content,
            id : message.$id,
            createdAt : message.$createdAt
        }))
        return MSGS
    } catch (error) {
        console.log("error is here GetchatMesssages")
        return error 

    }
  
}

//----------------------------------------------------------------









//----------------------------------------------------------------
//@List All The Messages from database tested 1.0
export async function ListDocumentsMessage(){
    try{
    const response = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLECTION_ID_Mess)
    return response
    }
    catch(error){
        console.error(error)
        throw error
    }
}

//----------------------------------------------------------------








//----------------------------------------------------------------
//@Add Documents to the database Especialy the chatGBT Answers //Tested 1.0
export  async function CreateDocumentMessage(payload){
    try {
        await databases.createDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLECTION_ID_Mess, ID.unique() , {
            "Role": payload.role,
            "content": payload.content,
            "chats": payload.chatID,
        }).then(response =>console.log(response))
    }
     catch (error) {
        console.log(error); 
    }
}
//----------------------------------------------------------------








//----------------------------------------------------------------
export  async function CreateDocumentChat(){
    const unic = uuidv4().toString();
    try {
        await databases.createDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLECTION_ID_CHATS, ID.unique() , {
            "name": unic,
        }).then(response =>console.log(response))
    }
     catch (error) {
        console.log(error); 
    }
}
//----------------------------------------------------------------



export  async function EventSub(){
    client.subscribe(`databases.${import.meta.env.VITE_DATABASE_ID}.collections.${import.meta.env.VITE_COLECTION_ID_Mess}.documents` ,response => console.log(response))
}


export  async function EventSubChat(){
    client.subscribe(`databases.${import.meta.env.VITE_DATABASE_ID}.collections.${import.meta.env.VITE_COLECTION_ID_CHATS}.documents` ,response => console.log(response))
}