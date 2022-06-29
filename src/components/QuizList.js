import { useEffect, useState } from "react";
import Answer from './Answers'
import {nanoid} from 'nanoid'

export default function Quiz(props) {

    const [allQuestions, setAllQuestions] = useState([])
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => data.results)
            .then(data => {
                return setAllQuestions(data.map(quest => {
                    return {
                        ...quest,
                        id: nanoid(),
                        selectedAnswer: "",
                        showAnswer: false
                    }
                }))
            })        
    }, [])

    const handleSelectAnswer = (quizId, answer) => {
		if (!isGameOver) {
			setAllQuestions(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === quizId
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}

    const quizElements = allQuestions.map(quest => {
        return <Answer 
            id={quest.id}
            key={quest.id}
            question={quest.question}
            correctAnswer={quest.correct_answer}
            incorrectAnswers={quest.incorrect_answers}
            showAnswer={quest.showAnswer}
            selectedAnswer={quest.selectedAnswer}
            handleSelectAnswer={handleSelectAnswer}
        />
    })

    return (
        <div className='quiz--container'>
            {/* <h3 className='quiz--title'>

            </h3>
            <div className='quiz--answers'>
                {}
            </div>
            <hr/>
            <div className="quiz--check">
                <button className="btn">
                    {checkAnswers ? "Reset" : "Check answers"}
                </button>
            </div> */}
            {quizElements}
        </div>
    )
}