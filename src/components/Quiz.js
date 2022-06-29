import { useState } from "react";
import QuizAnswer from './QuizAnswer'
import {nanoid} from 'nanoid'

export default function Quiz(props) {
    const [answers, setAnswers] = useState(allNewAnswers(props))

    function allNewAnswers(props) {
        const newAnswers = []
        props.incorrect_answers.forEach((answer => {
            newAnswers.push({
                answer: answer,
                isHold: false,
                correct: false,
                id: nanoid()
            })
        }))
        newAnswers.push({
            answer: props.correct_answer,
            isHold: false,
            correct: true,
            id: nanoid()
        })

        newAnswers.sort(() => Math.random() - 0.5)
        return newAnswers
    }

    function hold(id) {
        setAnswers(prevAnswer => prevAnswer.map(ans => {
            return ans.isHold ?
                {...ans, isHold: !ans.isHold} :
                ans
        }))

        setAnswers(prevAnswer => prevAnswer.map(ans => {
            return ans.id === id ?
                {...ans, isHold: !ans.isHold} :
                ans
        }))
    }

    let answersElemets = answers.map(answer => {
        return <QuizAnswer 
            hold={() => hold(answer.id)} 
            id={answer.id}
            key={answer.id}
            isHold={answer.isHold} 
            answer={answer.answer} 
        />
    })
  
    return (
        <div className='quiz--container'>
            <h3 className='quiz--title'>
                {props.question.replace(/&[A-Za-z0-9#]+;/g,'')}</h3>
            <div className='quiz--answers'>
                {answersElemets}
            </div>
            <hr/>
        </div>
    )
}