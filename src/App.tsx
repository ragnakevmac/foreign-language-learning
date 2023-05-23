import React, { useState, useRef } from 'react';
import Axios from 'axios';
import './App.css';
import Intro from './components/Intro';
import TextForm from './components/TextForm';
import SuggestedTranslationDisplay from './components/SuggestedTranslationDisplay';
import Tabs from './components/Tabs';
import { Texts } from './models/textFormProps';


function App() {



  interface Word {
    text: string;
    furigana: string;
    meaning: string;
  }
  

  interface WordArrayProps {
    words: string[];
  }

  interface WordReadings {
    [key: string]: string;
  }



  const [textToTranslate, setTextToTranslate] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [suggestedTranslation, setSuggestedTranslation] = useState<string>('');

  const [attemptAnalysis, setAttemptAnalysis] = useState<string>('');
  const [hint, setHint] = useState<string>('');

  const [translatedTextArray, setTranslatedTextArray] = useState<string[]>([]);
  const [suggestedTranslationArray, setSuggestedTranslationArray] = useState<string[]>([]);

  const [suggestedTranslationBoolsArray, setSuggestedTranslationBoolsArray] = useState<boolean[]>([]);


  const [tokenizedJapaneseSentenceArray, setTokenizedJapaneseSentenceArray] = useState<string[]>([])

  const [words, setWords] = useState<string[]>([]);

  const [wordReadings, setWordReadings] = useState<WordReadings>({});




  const fetchSuggestedTranslation = (textToTranslate: string, translatedText: string, generatedTextEngVerFromWanikani: string, sliderValues: number | number[]) => {

    setSuggestedTranslation('')
    setAttemptAnalysis('')
    setWords([])


    const url = 'https://tensaihonyaku.herokuapp.com/translation'
    const data = {
      textToTranslate: textToTranslate,
      translatedText: translatedText,
      generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    };

    Axios.post(url, data).then((res) => {
      generatedTextEngVerFromWanikani === '' ? setSuggestedTranslation(res.data.suggestedTranslation) : setSuggestedTranslation(generatedTextEngVerFromWanikani);


      setSuggestedTranslationBoolsArray(res.data.suggestedTranslationBoolsArray);
      setTranslatedTextArray(res.data.translatedTextArray);
      setSuggestedTranslationArray(res.data.suggestedTranslationArray); 



    }).catch((error) => {
      console.log(error);
    });




    const url_analysis = 'https://tensaihonyaku.herokuapp.com/analysis'
    const data_analysis = {
      textToTranslate: textToTranslate,
      translatedText: translatedText,
      generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    };

    Axios.post(url_analysis, data_analysis).then((res) => {
      setAttemptAnalysis(res.data.attemptAnalysis)


    }).catch((error) => {
      console.log(error);
    });


    
  }

  const displaySubmittedText = (texts: Texts) => {
    setTextToTranslate(texts.textToTranslate);
    setTranslatedText(texts.translatedText);
    fetchSuggestedTranslation(texts.textToTranslate, texts.translatedText, texts.generatedTextEngVerFromWanikani, texts.sliderValues)
  }


  const fetchHint = (textToTranslate: string, translatedText: string, generatedTextEngVerFromWanikani: string) => {
    const url_hint = 'https://tensaihonyaku.herokuapp.com/hint'
    const data_hint = {
      textToTranslate: textToTranslate,
      translatedText: translatedText,
      generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    };

    Axios.post(url_hint, data_hint).then((res) => {

      setHint(res.data.hint)

    }).catch((error) => {
      console.log(error);
    });
  }



  const handleHint = (texts: Texts) => {
    fetchHint(texts.textToTranslate, texts.translatedText, texts.generatedTextEngVerFromWanikani);
  }




  const handleReadingDisplay = (wordClicked: string) => {
    const url_reading = 'https://tensaihonyaku.herokuapp.com/reading'
    const data_reading = {
      wordClicked: wordClicked,
      textToTranslate: textToTranslate,
    };

    Axios.post(url_reading, data_reading).then((res) => {

      setWordReadings(res.data.reading)

      console.log("DICT!!!!!!!!", wordReadings)

    }).catch((error) => {
      console.log(error);
    });
  }




  const handleTokenize = () => {
    const url_tokenize = 'https://tensaihonyaku.herokuapp.com/tokenize'
    const data_tokenize = {
      textToTranslate: textToTranslate,
    };

    Axios.post(url_tokenize, data_tokenize).then((res) => {

      setWords(res.data.tokenizedArray);

    }).catch((error) => {
      console.log(error);
    });
  }



  const updateTextToTranslate = (val: string) => {
    setTextToTranslate(val);
  }



  return (
    <div className="App">
      <Intro person="" />
      <div className="textAreas">
      <TextForm
        onSubmitTexts={displaySubmittedText}
        onHandleHint={handleHint}
        hint={hint}
        onUpdateTextToTranslate={updateTextToTranslate}
      />

      </div>

      {/* <div className="suggestedTranslation">
        <SuggestedTranslationDisplay suggestedTranslation={suggestedTranslation} />
      </div> */}

      <Tabs 
        suggestedTranslation={suggestedTranslation} 
        attemptAnalysis={attemptAnalysis} 
        words={words} 
        wordReadings={wordReadings}
        onHandleReadingDisplay={handleReadingDisplay}
        onHandleTokenize={handleTokenize}
        textToTranslate={textToTranslate}
      />



      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      

        
    </div>
  );
}

export default App;