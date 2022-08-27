import React from 'react';
// import TextToTranslate from '../models/textToTranslate';
import '../App.css'


function EngDefDisplay({ engDefinitionsArray }: any): JSX.Element {

    let engDefinitions = engDefinitionsArray[0]
    let engDefinitionsCame = engDefinitionsArray[1]
    let tokenizedJapaneseSentenceArray = engDefinitionsArray[2]

    console.log(`engDefinitions: ${engDefinitions}`);

    return (
        <div className='engDefinitionsDisplay'>
            {engDefinitionsCame && <h1>English Meanings:</h1>}
            <div style={{color: 'white'}}>{Object.keys(tokenizedJapaneseSentenceArray).map((key, index) => {
                return (
                <div key={index}>
                    
                   <h1><u>{tokenizedJapaneseSentenceArray[index]}</u></h1><h3>{engDefinitions[tokenizedJapaneseSentenceArray[index]].map((txt: any, index: number) => <p key={index}>{txt}</p>)}</h3>
                   <br />
                    
                </div>
                );
            })}</div>
        </div>
    )
}

export default EngDefDisplay;