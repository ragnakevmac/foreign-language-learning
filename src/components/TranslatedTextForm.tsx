import React, { useRef } from 'react';
import TranslatedTextFormProps from '../models/translatedTextFormProps';
import '../App.css'


function TranslatedTextForm({ onSubmitTranslatedText }: TranslatedTextFormProps): JSX.Element {

    const inputRef = useRef<HTMLTextAreaElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const translatedTextToBeSubmitted = inputRef.current!.value;
        onSubmitTranslatedText(translatedTextToBeSubmitted);
    }

    return (
      <div className='textForm'>
        <form onSubmit={handleSubmit}>
          Your English trasnlation:
          <br />
          <textarea 
            placeholder='Write your translation here'  
            style={{width: "400px", height: "200px"}}
            ref={inputRef}
          />
          <br />
         <button type='submit'>Submit</button>
        </form>
      </div>
    )
}

export default TranslatedTextForm;