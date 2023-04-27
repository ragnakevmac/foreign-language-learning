import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import Intro from './components/Intro';
import TextForm from './components/TextForm';
import JapaneseTargetsDisplay from './components/JapaneseTargetsDisplay';
import EnglishTargetsDisplay from './components/EnglishTargetsDisplay';
import EngDefDisplay from './components/EngDefDisplay';
import SuggestedTranslationDisplay from './components/SuggestedTranslationDisplay';
import ScoreDisplay from './components/ScoreDisplay';
import Tabs from './components/Tabs';
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

  const [engDefinitionsCame, setEngDefinitionsCame] = useState<boolean>(false);
  const [japaneseTargetsCame, setJapaneseTargetsCame] = useState<boolean>(false);
  const [englishTargetsCame, setEnglishTargetsCame] = useState<boolean>(false);


  const [translatedTextArray, setTranslatedTextArray] = useState<string[]>([]);
  const [suggestedTranslationArray, setSuggestedTranslationArray] = useState<string[]>([]);

  const [suggestedTranslationBoolsArray, setSuggestedTranslationBoolsArray] = useState<boolean[]>([]);


  const [tokenizedJapaneseSentenceArray, setTokenizedJapaneseSentenceArray] = useState<string[]>([])



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



      setEnglishTargetsCame(true);
      setSuggestedTranslationBoolsArray(res.data.suggestedTranslationBoolsArray);
      setTranslatedTextArray(res.data.translatedTextArray);
      setSuggestedTranslationArray(res.data.suggestedTranslationArray);

      // console.log(`res.data.suggestedTranslationBoolsArray: ${res.data.suggestedTranslationBoolsArray}`)


      // generatedTextEngVerFromWanikani === '' ? setSuggestedTranslationArray(suggestedTranslation.split(" ")) : setSuggestedTranslationArray(generatedTextEngVerFromWanikani.split(" "));
      
      



    }).catch((error) => {
      console.log(error);
    });




    // const urlJp = '/japanese-data'
    // const dataJp = {
    //   textToTranslate: textToTranslate,
    //   translatedText: translatedText,
    //   generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani,
    //   suggestedTranslation: suggestedTranslation
    // };

    // Axios.post(urlJp, dataJp).then((res) => {

    //   setJapaneseScore(res.data.japaneseScore);
    //   setEngDefinitions(res.data.engDefinitions);
    //   setJapaneseTargets(res.data.japaneseTargets);

    //   setEngDefinitionsCame(true);
    //   setJapaneseTargetsCame(true);

    //   setTokenizedJapaneseSentenceArray(res.data.tokenizedJapaneseSentenceArray);




      


    // }).catch((error) => {
    //   console.log(error);
    // });

    
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
      {/* <div className="suggestedTranslation">
        <SuggestedTranslationDisplay suggestedTranslation={suggestedTranslation} />
      </div> */}
      <Tabs suggestedTranslation={suggestedTranslation} />
      <br />
      <br />
      <br />
      <ScoreDisplay score={score}/> 
      <br />
      <br />
      <br />
      <EnglishTargetsDisplay englishTargetsArray={[translatedTextArray, suggestedTranslationArray, suggestedTranslationBoolsArray, englishTargetsCame]} />
      <br />
      <br />
      <br />
      <JapaneseTargetsDisplay japaneseTargetsArray={[japaneseTargets, japaneseTargetsCame, tokenizedJapaneseSentenceArray]} />
      <br />
      <br />
      <br />
      <EngDefDisplay engDefinitionsArray={[engDefinitions, engDefinitionsCame, tokenizedJapaneseSentenceArray]} />
      <br />
      

        
    </div>
  );
}

export default App;
