import React, { useState, useRef } from 'react';
import Axios from 'axios';
import Slider from '@mui/material/Slider';
import { TextFormProps } from '../models/textFormProps';
import '../App.css'


function TextForm({ onSubmitTexts }: TextFormProps): JSX.Element {

    const inputRefTextToTranslate = useRef<HTMLTextAreaElement>(null);
    const inputRefTranslatedText = useRef<HTMLTextAreaElement>(null);

    const [generatedText, setGeneratedText] = useState<string>('');
    const [generatedTextEngVerFromWanikani, setGeneratedTextEngVer] = useState<string>('');

    const [sliderValues, setSliderValues] = useState<number | number[]>([0, 100]);


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const textToTranslate = inputRefTextToTranslate.current!.value;
        const translatedText = inputRefTranslatedText.current!.value;
        onSubmitTexts({
          textToTranslate, 
          translatedText, 
          generatedTextEngVerFromWanikani, 
          sliderValues
        }); //display
    }

    function handleGenerate(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();

      Axios.get('generation', { params: { difficultyRange:  sliderValues} }).then((res) => {
        setGeneratedText(res.data.ja);
        setGeneratedTextEngVer(res.data.en);
      }).catch((error) => {
        console.log(error);
      });
    }

    function handleOnChange(val: string) {
      setGeneratedText(val);
      setGeneratedTextEngVer(''); //reset
    }

    const handleSlider = (e: Event, val: number | number[], activeThumb: number) => {
      e.preventDefault();
      console.log(`e: ${e}`);
      console.log(`val: ${val}`);
      console.log(`activeThumb: ${activeThumb}`);
      setSliderValues(val);
    }



    return (
      <div className='textForm'>

        <form onSubmit={handleSubmit}>

          <label>Japanese text to be translated:</label>
            <br />
            <textarea 
              className='textToTranslateForm'
              placeholder='Japanese text goes here'  
              required
              style={{width: "400px", height: "200px"}}
              ref={inputRefTextToTranslate}
              value={generatedText}
              onChange={(e) => handleOnChange(e.target.value)}
            />
          <br />
         Can't come up with a Japanese sentence? <br />
         Click the "generate" button to generate random Japanese sentences. <br />
         You can also adjust the slider to adjust the difficulty. <br />
         <Slider
            sx={{ height: '10%' }}
            style={{
              maxWidth: "280px",
              marginRight: "40px",
              marginTop: "10px"
            }}
            getAriaLabel={() => 'Difficulty range'}
            value={sliderValues}
            onChange={(e, val, activeThumb) => handleSlider(e, val, activeThumb)}
            valueLabelDisplay="auto"
          />
         <button 
          onClick={handleGenerate}
          style={{
            minHeight: "40px",
            paddingTop: "2px",
          }}
        >Generate</button>            

          <br />
          <br />
          <br />

          <label>Your English trasnlation for practice:</label>
            <br />
            <textarea 
              className='translatedTextForm'
              placeholder='Write your English translation here'  
              required
              style={{width: "400px", height: "200px"}}
              ref={inputRefTranslatedText}
            />
          <br />
         <button 
          type='submit'
          style={{
            padding: '8px',
            marginTop: '6px'
          }}
        >Rate My Skills!</button>
        </form>
      </div>
    )
}

export default TextForm;