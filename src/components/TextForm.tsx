import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { TextFormProps } from '../models/textFormProps';
import '../App.css'


function TextForm({ onSubmitTexts }: TextFormProps): JSX.Element {

    const inputRefTextToTranslate = useRef<HTMLTextAreaElement>(null);
    const inputRefTranslatedText = useRef<HTMLTextAreaElement>(null);

    const [generatedText, setGeneratedText] = useState<string>('');
    const [generatedTextEngVerFromWanikani, setGeneratedTextEngVer] = useState<string>('');


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const textToTranslate = inputRefTextToTranslate.current!.value;
        const translatedText = inputRefTranslatedText.current!.value;
        onSubmitTexts({textToTranslate, translatedText, generatedTextEngVerFromWanikani}); //display
    }

    function handleGenerate(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();

      Axios.get('generation').then((res) => {
        setGeneratedText(res.data.ja);
        setGeneratedTextEngVer(res.data.en);
      }).catch((error) => {
        console.log(error);
      });
    }

    function handleOnChange(val: string) {
      setGeneratedText(val);
      setGeneratedTextEngVer(''); //reset
    }


    return (
      <div className='textForm'>

        <form onSubmit={handleSubmit}>

          <label>Japanese text to be translated:</label>
            <br />
            <textarea 
              className='textToTranslateForm'
              placeholder='Japanese text here'  
              required
              style={{width: "400px", height: "200px"}}
              ref={inputRefTextToTranslate}
              value={generatedText}
              onChange={(e) => handleOnChange(e.target.value)}
            />
          <br />
         Can't come up with a Japanese sentence? <br />
         Click to generate random Japanese sentences: <br />
         <button onClick={handleGenerate}>Generate</button>            

          <br />
          <br />
          <br />

          <label>Your English trasnlation:</label>
            <br />
            <textarea 
              className='translatedTextForm'
              placeholder='Write your translation here'  
              required
              style={{width: "400px", height: "200px"}}
              ref={inputRefTranslatedText}
            />
          <br />
         <button type='submit'>Submit</button>
        </form>
      </div>
    )
}

export default TextForm;