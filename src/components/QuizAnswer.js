import React from 'react'

export default function QuizAnswer(props) {
    const styles = {
        backgroundColor: props.isHold ? '#D6DBF5' : 'transparent'
    }
  
    return (
        <div className='quiz--answers'>
            <button onClick={props.hold} style={styles}>
                {props.answer.replace(/&[A-Za-z0-9#]+;/g,'')}
            </button>
        </div>
    )
}