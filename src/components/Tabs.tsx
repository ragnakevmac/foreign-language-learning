import React, { useState } from "react";
import SuggestedTranslationDisplay from '../components/SuggestedTranslationDisplay';
import SuggestedTranslation from '../models/suggestedTranslation';
import "../App.css";
import WordArray from '../components/WordArray';

interface Word {
  text: string;
  furigana: string;
  meaning: string;
}

interface WordArrayProps {
  words: string[];
}

interface WordReadings {
  wordReadings: { [key: string]: string };
}

interface TabsProps extends SuggestedTranslation, WordArrayProps, WordReadings {
  attemptAnalysis: string;
  onHandleReadingDisplay: (wordClicked: string) => void;
  onHandleTokenize: () => void;
  textToTranslate: string;
}





function Tabs({ suggestedTranslation, attemptAnalysis, words, wordReadings, onHandleTokenize, onHandleReadingDisplay }: TabsProps): JSX.Element {


  const [toggleState, setToggleState] = useState<number>(1);

  const toggleTab = (index: number): void => {
    setToggleState(index);
    if (index === 3) {
      onHandleTokenize();
    }
  };
  
  

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Suggested<br />
          Translation
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Attempt<br />
          Analysis
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Morphological<br />
          Analysis
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
        <div className="suggestedTranslation">
            <SuggestedTranslationDisplay suggestedTranslation={suggestedTranslation} />
        </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <p className="attemptAnalysis">
            {attemptAnalysis ? attemptAnalysis : 'loading...'}
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <p>
            <WordArray
              words={words}
              wordReadings={wordReadings}
              onHandleReadingDisplay={onHandleReadingDisplay}
            />

          </p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;