import React from 'react';
// import TranslatedText from '../models/translatedText';
import '../App.css'


function JapaneseTargetsDisplay({ japaneseTargets }: any): JSX.Element {
    console.log(japaneseTargets);
    return (
        <div className='japaneseTargets'>
            <h1>Japanese Words that You Hit and Missed:</h1><br />
            <div style={{
                color: 'white',
                display: 'flex'
                }}>{Object.keys(japaneseTargets).map((key, index) => {
                return (
                <div 
                    key={index} 
                    style={{
                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                        flex: 1
                    }}>
                    
                   <h3 style={{margin: '1px'}}>{key}
                   <br />
                   {japaneseTargets[key]}
                   </h3>
                    
                </div>
                );
            })}</div>
        </div>
    )
}

export default JapaneseTargetsDisplay;