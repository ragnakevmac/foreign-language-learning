import React from 'react';
// import TextToTranslate from '../models/textToTranslate';
import '../App.css'


function TextToTranslateDisplay({ textToTranslate }: any): JSX.Element {
    console.log(textToTranslate);
    return (
        <div className='textToTranslateDisplay'>
            <h1>English Meanings:</h1> 
            <hr />
            <br />
            <div style={{color: 'white'}}>{Object.keys(textToTranslate).map((key, index) => {
                return (
                <div key={index}>
                    
                   <h1>{key}:</h1> <h3>{textToTranslate[key].map((txt: any, index: number) => <p key={index}>{txt}</p>)}</h3>
                    

                    <hr />
                </div>
                );
            })}</div>
        </div>
    )
}

export default TextToTranslateDisplay;