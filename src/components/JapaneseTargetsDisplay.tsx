import React from 'react';
// import TranslatedText from '../models/translatedText';
import '../App.css'


function JapaneseTargetsDisplay({ japaneseTargetsArray }: any): JSX.Element {


    let japaneseTargets = japaneseTargetsArray[0];
    let japaneseTargetsCame = japaneseTargetsArray[1];
    let tokenizedJapaneseSentenceArray = japaneseTargetsArray[2];

    console.log(`japaneseTargets: ${japaneseTargets}`);
    console.log(`tokenizedJapaneseSentenceArray: ${tokenizedJapaneseSentenceArray}`);

    return (
        <div className='japaneseTargets'>
            {japaneseTargetsCame && <h1>Japanese Words that You Hit and Missed:</h1>}
            <br />
            <div style={{
                color: 'white',
                display: 'flex'
                }}>{Object.keys(tokenizedJapaneseSentenceArray).map((key, index) => {
                return (
                    <div 
                    key={index} 
                    style={{
                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                        flex: 1
                    }}>
                    
                   <h3 style={{margin: '1px'}}>{tokenizedJapaneseSentenceArray[index]}
                   <br />
                   {japaneseTargets[tokenizedJapaneseSentenceArray[index]]}
                   </h3>
                    
                </div>
                );
            })}</div>
        </div>
    )
}

export default JapaneseTargetsDisplay;