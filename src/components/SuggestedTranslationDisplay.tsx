import React from 'react';
import SuggestedTranslation from '../models/suggestedTranslation';
// import '../App.css'


function SuggestedTranslationDisplay({ suggestedTranslation }: SuggestedTranslation): JSX.Element {



    return (
        <div className='suggestedTranslationDisplay'>
            Display of suggested translation:
            {/* <p>{suggestedTranslation}</p> */}

            <br />
            <textarea 
            //   className='translatedTextForm'
              placeholder='Your suggested translation will appear here'  
              style={{width: "400px", height: "200px"}}
              value={suggestedTranslation}
            />


        </div>
    )
}

export default SuggestedTranslationDisplay;