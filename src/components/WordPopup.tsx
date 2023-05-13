// WordPopup.tsx
import React, { useState, useEffect } from 'react';
import '../App.css';

interface Word {
  text: string;
  furigana: string;
  meaning: string;
}

interface WordPopupProps {
  words: Word[];
}

interface Popup {
  meaning: string;
  posX: number;
  posY: number;
}

const WordPopup: React.FC<WordPopupProps> = ({ words }) => {
  const [popup, setPopup] = useState<Popup | null>(null);

  const showPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    meaning: string
  ) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setPopup({ meaning: meaning, posX: rect.left, posY: rect.top });
  };

  const hidePopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    document.addEventListener('click', hidePopup);
    return () => {
      document.removeEventListener('click', hidePopup);
    };
  }, []);

  return (
    <div className="wordPopupContainer">
      {words.map((word, index) => (
        <div
          key={index}
          className="word"
          onClick={(event) => showPopup(event, word.meaning)}
        >
          <ruby>
            {word.text}
            {word.furigana && <rt>{word.furigana}</rt>}
          </ruby>
        </div>
      ))}
      {popup && (
        <div
          className="popup"
          style={{
            left: popup.posX,
            top: popup.posY - 40, // Adjust this value to position the popup above the word
          }}
        >
          {popup.meaning}
        </div>
      )}
    </div>
  );
};

export default WordPopup;
