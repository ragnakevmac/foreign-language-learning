import React from 'react';
import SuggestedTranslation from '../models/suggestedTranslation';
// import '../App.css'


function SuggestedTranslationDisplay({ suggestedTranslation }: SuggestedTranslation): JSX.Element {



    return (
        <div className='suggestedTranslationDisplay'>
            Display of suggested translation:
            <br />
            <textarea 
            //   className='translatedTextForm'
              placeholder='Your suggested translation will appear here'  
              style={{width: "400px", height: "200px"}}
              defaultValue={suggestedTranslation}
            />
        </div>
    )
}

export default SuggestedTranslationDisplay;