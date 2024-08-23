import { useEffect, useRef, useState } from 'react';
import './newPrompt.css'
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown  from 'react-markdown'

const NewPrompt = () => {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const endRef = useRef(null);
  const [img,setImage] =  useState({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{}
  })
 

  useEffect(()=>{
    endRef.current.scrollIntoView({behavior: "smooth"})
  }, [answer, question, img.dbData])

  const add = async (text) => {
    setQuestion(text);
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : [text]);
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }
    // setAnswer(accumulatedText)
    setImage({isLoading:false,error:"",dbData:{},aiData:{}})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;

    add(text)
  }

  return (
    <>
      {img.isLoading && <div>Loading ...</div>}
      {img.dbData?.filePath && (
        <IKImage  
          urlEndpoint={process.env.REACT_APP_VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{width:380}]}
      />)}
      {question && <div className='message user'>{question}</div>}
      {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
      <div className="endChat"ref={endRef}></div>
      <form className='newForm' onSubmit={handleSubmit}>
        <Upload setImage={setImage}/>
        <input id='file' type='file' multiple={false} hidden/>
        <input type='text' name="text" placeholder='Ask anything...' />
        <button>
          <img src='/arrow.png' alt=''/>
        </button>
      </form>
      
    </>
  )
}

export default NewPrompt
