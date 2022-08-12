import React from 'react';
import TranslatedText from '../models/translatedText';
// import '../App.css'


function TranslatedTextDisplay({ translatedText }: TranslatedText): JSX.Element {
    return (
        <div className='textDisplay'>
            Display of your translated text:
            <p>{translatedText}</p>
        </div>
    )
}

export default TranslatedTextDisplay;