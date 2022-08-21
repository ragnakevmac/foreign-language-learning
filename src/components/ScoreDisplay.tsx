import React from 'react';
import Score from '../models/score';


function ScoreDisplay({ score }: Score): JSX.Element {
    return (
        <div className='scoreDisplay'>
            <h1>YOUR SCORE:</h1>
            <h1>{score}/100</h1>
        </div>
    )
}

export default ScoreDisplay;