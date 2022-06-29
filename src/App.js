import { useState, useEffect } from "react";
import Start from './components/Start'
import Quiz from './components/Quiz'
import { nanoid } from "nanoid";

export default function App() {

    const [allQuestions, setAllQuestions] = useState([])
    const [gameStart, setGameStart] = useState(false)
    const [checkAnswers, setCheckAnswers] = useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                setAllQuestions(data.results)
            })
        
    }, [])

    useEffect(() => {
        
    }, [checkAnswers])

    const allQuestionsElements = allQuestions.map(quiz => {
        return <Quiz 
            key={nanoid()}
            question={quiz.question}
            incorrect_answers={quiz.incorrect_answers}
            correct_answer={quiz.correct_answer}
            />
    })

    function startGame() {
        setGameStart(prevGameStart => !prevGameStart)
    }

    function checkAnswer() {
        
    }
  
    return (
        <div className='app'>
            {gameStart ? 
                <div className='quiz'>
                    {allQuestionsElements}
                    <div className="quiz--check">
                        <button onClick={checkAnswer} className="btn">
                            Check answers
                        </button>
                    </div>
                </div>
                : <Start gameStart={() => startGame()} />
            }
            <img className='blob-1' src='blob-1.png' alt='blob-1' draggable="false"/>
            <img className='blob-2' src='blob-2.png' alt='blob-2' draggable="false"/>
        </div>
    )
}