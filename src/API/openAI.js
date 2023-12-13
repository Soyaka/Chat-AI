
import OpenAI from "openai";
import { GetchatMesssages , CreateDocumentMessage } from './main.js';


const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});



async function GetData(chatID){
  try {
    const res = await GetchatMesssages(chatID)
    const NetRes = res?.map(message => ({
        role: message.role,
        content: message.content
    })
    )
    return NetRes
  } catch (error) {
    return error
  }
}


 async function GetCompletionGBT(chatID) {
  const messages = await GetData(chatID)
    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
    return(completion.choices[0].message);
  }



 export  async function AddSystemMsg(chatID){
    try {
      const load = await GetCompletionGBT(chatID)
      const payload = {
        ...load,
        "chatID" : chatID
      }

      await CreateDocumentMessage(payload)
      return payload
    } catch (error) {
      return error
    }
    
  }


