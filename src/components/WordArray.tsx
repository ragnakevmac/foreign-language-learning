import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

interface WordArrayProps {
  words: string[];
  wordReadings: { [key: string]: string };
  onHandleReadingDisplay: (wordClicked: string) => void;
}

const WordArray: React.FC<WordArrayProps> = ({
  words,
  wordReadings,
  onHandleReadingDisplay,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (word: string, event: React.MouseEvent) => {
    event.stopPropagation();

    setLoading(true); // Set loading to true when handling the click
    onHandleReadingDisplay(word);

    if (selectedWord && selectedWord === word) {
      handleClose();
    } else {
      setSelectedWord(word);
      setPopupPosition({ x: event.clientX - 30, y: event.clientY - 85 });
    }
  };

  const handleClose = () => {
    setSelectedWord(null);
    setPopupPosition(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (selectedWord) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedWord]);

  useEffect(() => {
    if (selectedWord) {
      setLoading(false); // Set loading to false when wordReadings has been updated
    }
  }, [wordReadings, selectedWord]);

  return (
    <div>
      {words && words.length > 0 ? (
        words.map((word, index) => (
          <div
            key={index}
            className="word"
            onClick={(event) => handleClick(word, event)}
          >
            {word}
          </div>
        ))
      ) : (
        <p>No words found.</p>
      )}
      {selectedWord && popupPosition && (
        <div
          ref={popupRef}
          style={{
            position: 'fixed',
            top: popupPosition.y,
            left: popupPosition.x,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '1em',
              borderRadius: '8px',
            }}
          >
            {loading ? '' : wordReadings[selectedWord]}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordArray;
