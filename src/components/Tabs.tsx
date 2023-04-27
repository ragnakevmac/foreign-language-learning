import React, { useState } from "react";
import SuggestedTranslationDisplay from '../components/SuggestedTranslationDisplay';
import SuggestedTranslation from '../models/suggestedTranslation';
import "../App.css";



function Tabs({ suggestedTranslation }: SuggestedTranslation): JSX.Element {

  const [toggleState, setToggleState] = useState<number>(1);

  const toggleTab = (index: number): void => {
    setToggleState(index);
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
          Tab 2
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Tab 3
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
          <h2>Content 2</h2>
          <hr />
          <p>
            TAB CONTENT 2
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            TAB CONTENT 3
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
