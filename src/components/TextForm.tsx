import React, { useState, useRef } from 'react';
import Axios from 'axios';
import Slider from '@mui/material/Slider';
import { TextFormProps } from '../models/textFormProps';
import '../App.css';
import HintBox from './HintBox';

function TextForm({ onSubmitTexts, onHandleHint, hint }: TextFormProps): JSX.Element {
  const inputRefTextToTranslate = useRef<HTMLTextAreaElement>(null);
  const inputRefTranslatedText = useRef<HTMLTextAreaElement>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [generatedTextEngVerFromWanikani, setGeneratedTextEngVer] = useState<string>('');
  const [sliderValues, setSliderValues] = useState<number | number[]>([0, 100]);
  const [hintVisible, setHintVisible] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const textToTranslate = inputRefTextToTranslate.current!.value;
    const translatedText = inputRefTranslatedText.current!.value;
    onSubmitTexts({
      textToTranslate,
      translatedText,
      generatedTextEngVerFromWanikani,
      sliderValues,
    });
  };

  const handleGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Axios.get('generation', { params: { difficultyRange: sliderValues } })
      .then((res) => {
        setGeneratedText(res.data.ja);
        setGeneratedTextEngVer(res.data.en);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChange = (val: string) => {
    setGeneratedText(val);
    setGeneratedTextEngVer(''); // reset
  };

  const handleSlider = (e: Event, val: number | number[], activeThumb: number) => {
    e.preventDefault();
    setSliderValues(val);
  };

  const handleHintBoxHide = () => {
    setHintVisible(false);
  };

  const handleShowHint = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const textToTranslate = inputRefTextToTranslate.current!.value;
    const translatedText = inputRefTranslatedText.current!.value;
    onHandleHint({
      textToTranslate,
      translatedText,
      generatedTextEngVerFromWanikani,
      sliderValues,
    });
    setHintVisible(!hintVisible);
  };
  
  

  return (
    <div className="textForm">
      <form onSubmit={handleSubmit}>
        <label>Japanese text to be translated:</label>
        <br />
        <textarea
          className="textToTranslateForm"
          placeholder="Japanese text goes here"
          required
          style={{ width: '400px', height: '200px' }}
          ref={inputRefTextToTranslate}
          value={generatedText}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <br />
        Can't come up with a Japanese sentence?
        <br />
        Click the "generate" button to generate random Japanese sentences.
        <br />
        You can also adjust the slider to adjust the difficulty.
        <br />
        <Slider
          sx={{ height: '10%' }}
          style={{
            maxWidth: '280px',
            marginRight: '40px',
            marginTop: '10px',
          }}
          getAriaLabel={() => 'Difficulty range'}
          value={sliderValues}
          onChange={(e, val, activeThumb) => handleSlider(e, val, activeThumb)}
          valueLabelDisplay="auto"
        />
        <button
          onClick={handleGenerate}
          style={{
            minHeight: '40px',
            paddingTop: '2px',
          }}
        >
          Generate
        </button>
        <br />
        <br />
        <br />
        <label>Your English translation for practice:</label>
        <br />
        <textarea
          className="translatedTextForm"
          placeholder="Write your English translation here"
          required
          style={{ width: '400px', height: '200px' }}
          ref={inputRefTranslatedText}
        />

        <HintBox
          hint={hint}
          targetRef={inputRefTranslatedText}
          position={{ top: 0, left: -270 }}
          visible={hintVisible}
          onHide={handleHintBoxHide}
        />

        <br />
        <button
          onClick={handleShowHint}
          className="show-hint-button"
          style={{
            padding: '8px',
            marginTop: '6px',
            marginRight: '130px',
          }}
        >
          Hint
        </button>

        <button
          type="submit"
          style={{
            padding: '8px',
            marginTop: '6px',
            marginLeft: '130px',
          }}
        >
          Evaluate
        </button>
      </form>
    </div>
  );
}

export default TextForm;
