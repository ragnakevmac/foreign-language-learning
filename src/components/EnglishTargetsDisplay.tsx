import React from 'react';
// import TranslatedText from '../models/translatedText';
import '../App.css'


function EnglishTargetsDisplay({ englishTargetsArray }: any): JSX.Element {


    let translatedTextArray = englishTargetsArray[0];
    let suggestedTranslationArray = englishTargetsArray[1];
    let suggestedTranslationBoolsArray = englishTargetsArray[2];
    let englishTargetsCame = englishTargetsArray[3];



    console.log(`translatedTextArray: ${translatedTextArray}`);
    console.log(`suggestedTranslationArray: ${suggestedTranslationArray}`);

    return (
        <div className='japaneseTargets'>
            {englishTargetsCame && <h1>English Words that You Hit and Missed:</h1>}
            <br />
            <div style={{
                // color: 'white',
                display: 'flex'
                }}>{Object.keys(suggestedTranslationArray).map((key, index) => {
                return (
                    <div 
                    key={index} 
                    style={{
                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                        flex: 1
                    }}>
                    
                   <h3 style={{ ...{color: suggestedTranslationBoolsArray[index] ? 'green' : 'red'}}}>{suggestedTranslationArray[index]}</h3>
                    
                </div>
                );
            })}</div>
        </div>
    )
}

export default EnglishTargetsDisplay;