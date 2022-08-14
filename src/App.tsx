import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import Intro from './components/Intro';
import TextForm from './components/TextForm';
import TranslatedTextDisplay from './components/TranslatedTextDisplay';
import TextToTranslateDisplay from './components/TextToTranslateDisplay';
import SuggestedTranslationDisplay from './components/SuggestedTranslationDisplay';
import { Texts } from './models/textFormProps';


function App() {

  const [textToTranslate, setTextToTranslate] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [suggestedTranslation, setSuggestedTranslation] = useState<string>('');


  const fetchSuggestedTranslation = (textToTranslate: string, translatedText: string) => {

    const url = '/translation'
    const data = {
      textToTranslate: textToTranslate,
      translatedText: translatedText,
    };

    Axios.post(url, data).then((res) => {
      console.log(res.data.suggestedTranslation);
      setSuggestedTranslation(res.data.suggestedTranslation);
    }).catch((error) => {
      console.log(error);
    });
    
  }

  const displaySubmittedText = (texts: Texts) => {
    setTextToTranslate(texts.textToTranslate);
    setTranslatedText(texts.translatedText);
    fetchSuggestedTranslation(texts.textToTranslate, texts.translatedText)
    
  }


  return (
    <div className="App">
      <Intro person="Kevin" />
      <div className="textAreas">
        <TextForm onSubmitTexts={displaySubmittedText} />
      </div>
      <br />
      <br />
      <div className="suggestedTranslation">
        <SuggestedTranslationDisplay suggestedTranslation={suggestedTranslation} />
      </div>
      <br />
      <br />
      <TextToTranslateDisplay textToTranslate={textToTranslate} />
      <br />
      <TranslatedTextDisplay translatedText={translatedText} />

        
    </div>
  );
}

export default App;
