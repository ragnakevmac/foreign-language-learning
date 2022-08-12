import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Intro from './components/Intro';
import TranslatedTextForm from './components/TranslatedTextForm';
import TranslatedTextDisplay from './components/TranslatedTextDisplay';


function App() {

  const [translatedText, setTranslatedText] = useState<string>('');
  const displaySubmittedText = (translatedText: string) => {
    console.log(translatedText);
    setTranslatedText(translatedText);
  }


  return (
    <div className="App">
      <Intro person="Kevin" />
      <div className="textAreas">
        <TranslatedTextForm onSubmitTranslatedText={displaySubmittedText} />
        <TranslatedTextForm onSubmitTranslatedText={displaySubmittedText} />
        <TranslatedTextForm onSubmitTranslatedText={displaySubmittedText} />
      </div>
      <br />
      <br />
      <TranslatedTextDisplay translatedText={translatedText} />
        
    </div>
  );
}

export default App;
