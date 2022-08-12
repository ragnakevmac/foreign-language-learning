import React, { useRef } from 'react';
import { TextFormProps } from '../models/textFormProps';
import '../App.css'


function TextForm({ onSubmitTexts }: TextFormProps): JSX.Element {

    const inputRefTextToTranslate = useRef<HTMLTextAreaElement>(null);
    const inputRefTranslatedText = useRef<HTMLTextAreaElement>(null);


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const textToTranslate = inputRefTextToTranslate.current!.value;
        const translatedText = inputRefTranslatedText.current!.value;
        onSubmitTexts({textToTranslate, translatedText});
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
            />

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