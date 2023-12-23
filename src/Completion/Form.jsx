import React , {useState} from 'react'

const Form = () => {
    const [inputContent, setInputContent] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputContent('');
    
        const newMsg = {
          role: 'user',
          content: inputContent
        };
    
        CreateDocumentMessage({
          ...newMsg,
          chatID: chosenChat
        });
    
        const echo = dispatch(SetMessages([...reduxMessages, newMsg]));
        const response = await GetCompletionGBT([...echo.payload]);
    
        dispatch(SetMessages([...echo.payload, response]));
        CreateDocumentMessage({
          ...response,
          chatID: chosenChat
        });
      };
    
  return (
    <div className='  col-span-1'>
      <form onSubmit={(e) => handleSubmit(e)} action="" className='flex right-0 bottom-0  text-slate-100 fixed h-[4em] pb-1  w-[80%] items-center justify-center'>
          <input value={inputContent ? inputContent : ""} onChange={(e) => setInputContent(e.target.value)} type="text" placeholder="Type here" className="input input-bordered  mb-2 input-info w-[40em] border relative h-[3em] focus:outline-none" />
        </form>
    </div>
  )
}

export default Form
