import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import Intro from './components/Intro';
import TextForm from './components/TextForm';
import JapaneseTargetsDisplay from './components/JapaneseTargetsDisplay';
import EngDefDisplay from './components/EngDefDisplay';
import SuggestedTranslationDisplay from './components/SuggestedTranslationDisplay';
import ScoreDisplay from './components/ScoreDisplay';
import { Texts } from './models/textFormProps';


function App() {

  interface EngDefs {

  }

  const [textToTranslate, setTextToTranslate] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [suggestedTranslation, setSuggestedTranslation] = useState<string>('');

  const [score, setScore] = useState<string>('');
  const [japaneseScore, setJapaneseScore] = useState<string>('');
  const [engDefinitions, setEngDefinitions] = useState<object>({});
  const [japaneseTargets, setJapaneseTargets] = useState<object>({});


  const fetchSuggestedTranslation = (textToTranslate: string, translatedText: string, generatedTextEngVerFromWanikani: string, sliderValues: number | number[]) => {

    const url = '/translation'
    const data = {
      textToTranslate: textToTranslate,
      translatedText: translatedText,
      generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    };

    Axios.post(url, data).then((res) => {
      generatedTextEngVerFromWanikani === '' ? setSuggestedTranslation(res.data.suggestedTranslation) : setSuggestedTranslation(generatedTextEngVerFromWanikani);
      setScore(res.data.finalScore)
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });




    const urlJp = '/japanese-data'
    const dataJp = {
      textToTranslate: textToTranslate,
      translatedText: translatedText,
      generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    };

    Axios.post(urlJp, dataJp).then((res) => {
      
      setJapaneseScore(res.data.japaneseScore);
      setEngDefinitions(res.data.engDefinitions);
      setJapaneseTargets(res.data.japaneseTargets);

    }).catch((error) => {
      console.log(error);
    });

    
  }

  const displaySubmittedText = (texts: Texts) => {
    setTextToTranslate(texts.textToTranslate);
    setTranslatedText(texts.translatedText);
    fetchSuggestedTranslation(texts.textToTranslate, texts.translatedText, texts.generatedTextEngVerFromWanikani, texts.sliderValues)
    
  }



  return (
    <div className="App">
      <Intro person="" />
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
      <br />
      <ScoreDisplay score={score}/>
      <br />
      <br />
      <br />
      {/* <JapaneseTargetsDisplay japaneseTargets={japaneseTargets} />
      <br />
      <br />
      <br /> */}
      <EngDefDisplay engDefinitions={engDefinitions} />
      <br />

        
    </div>
  );
}

export default App;
