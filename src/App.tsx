import React, { useState, useRef } from 'react';
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
import WordPopup from './components/WordPopup';


function App() {



  interface Word {
    text: string;
    furigana: string;
    meaning: string;
  }
  
  
  // interface WordPopupProps {
  //   words: Word[];
  //   furiganaWords: Word[];
  // }

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

  // const [words, setWords] = useState<Word[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [wordReadings, setWordReadings] = useState<WordReadings>({});




  const fetchSuggestedTranslation = (textToTranslate: string, translatedText: string, generatedTextEngVerFromWanikani: string, sliderValues: number | number[]) => {

    setSuggestedTranslation('')
    setAttemptAnalysis('')
    setWords([])


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




    const url_analysis = '/analysis'
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






    // const url_morpho_analysis = '/morphoanalysis'
    // const data_morpho_analysis = {
    //   textToTranslate: textToTranslate,
    //   translatedText: translatedText,
    //   generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    // };

    // Axios.post(url_morpho_analysis, data_morpho_analysis).then((res) => {
    //   setWords(res.data.morphoAnalysis)


    // }).catch((error) => {
    //   console.log(error);
    // });



    // const url_hint = '/hint'
    // const data_hint = {
    //   textToTranslate: textToTranslate,
    //   translatedText: translatedText,
    //   generatedTextEngVerFromWanikani: generatedTextEngVerFromWanikani
    // };

    // Axios.post(url_hint, data_hint).then((res) => {

    //   setHint(res.data.hint)


    // }).catch((error) => {
    //   console.log(error);
    // });



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


  const fetchHint = (textToTranslate: string, translatedText: string, generatedTextEngVerFromWanikani: string) => {
    const url_hint = '/hint'
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
    const url_reading = '/reading'
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
    const url_tokenize = '/tokenize'
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
      {/* <ScoreDisplay score={score}/> 
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
      <br /> */}
      

        
    </div>
  );
}

export default App;