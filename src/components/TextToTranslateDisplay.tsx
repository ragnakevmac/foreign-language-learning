import React from 'react';
import TextToTranslate from '../models/textToTranslate';
// import '../App.css'


function TextToTranslateDisplay({ textToTranslate }: TextToTranslate): JSX.Element {
    return (
        <div className='textToTranslateDisplay'>
            Display of the text to translate:
            <p>{textToTranslate}</p>
        </div>
    )
}

export default TextToTranslateDisplay;