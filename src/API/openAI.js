
import OpenAI from "openai";
import { GetchatMesssages , CreateDocumentMessage } from './main.js';


const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});


export async function GetCompletionGBT(messages) {
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  return(completion.choices[0].message);
}


// export async function GenerateImage(prompt) {
//   try {
//     const response = await OpenAI.generateImage({
//       model: "dall-e-3",
//       prompt: prompt,
//       n: 1,
//       size: "1024x1024",
//     });

//     const image_url = response.data.choices[0].url;
//     return image_url;
//   } catch (error) {
//     console.error("Error generating image:", error);
//     // Handle the error appropriately, e.g., throw an error or return a default image URL
//     return null;
//   }
// }


// async function GetData(chatID){
//   try {
//     const res = await GetchatMesssages(chatID)
//     const NetRes = res?.map(message => ({
//         role: message.role,
//         content: message.content
//     })
//     )
//     return NetRes
//   } catch (error) {
//     return error
//   }
// }


//  async function GetCompletionGBT(chatID) {
//   const messages = await GetData(chatID)
//     const completion = await openai.chat.completions.create({
//       messages,
//       model: "gpt-3.5-turbo",
//     });
//     return(completion.choices[0].message);
//   }



//  export  async function AddSystemMsg(chatID){
//     try {
//       const load = await GetCompletionGBT(chatID)
//       const payload = {
//         ...load,
//         "chatID" : chatID
//       }

//       await CreateDocumentMessage(payload)
//       return payload
//     } catch (error) {
//       return error
//     }
    
//   }




