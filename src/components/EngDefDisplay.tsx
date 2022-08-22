import React from 'react';
// import TextToTranslate from '../models/textToTranslate';
import '../App.css'


function EngDefDisplay({ engDefinitions }: any): JSX.Element {
    console.log(engDefinitions);
    return (
        <div className='engDefinitionsDisplay'>
            <h1>English Meanings:</h1> 
            <hr />
            <br />
            <div style={{color: 'white'}}>{Object.keys(engDefinitions).map((key, index) => {
                return (
                <div key={index}>
                    
                   <h1>{key}:</h1> <h3>{engDefinitions[key].map((txt: any, index: number) => <p key={index}>{txt}</p>)}</h3>
                    

                    <hr />
                </div>
                );
            })}</div>
        </div>
    )
}

export default EngDefDisplay;