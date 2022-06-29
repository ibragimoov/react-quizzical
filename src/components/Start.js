import React from 'react'

export default function Start(props) {
  
    return (
        <div className='start--container'>
            <div className='start--info'>
                <h1 className='start--title'>Quizzical</h1>
                <h3 className='start--desc'>Can you answer all the questions?</h3>
                <button onClick={props.gameStart} className='btn start-btn'>Start quiz</button>
            </div>
        </div>
    )
}