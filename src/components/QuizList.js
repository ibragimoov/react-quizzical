import { useEffect, useState } from "react";
import Answer from './Answers'
import {nanoid} from 'nanoid'

export default function Quiz({handleGameStart}) {

    const [allQuestions, setAllQuestions] = useState([])
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false);
    const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const allQuestionsAnswered = allQuestions.every(question => question.selectedAnswer !== "");

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

    useEffect(() => {
		if (allQuestions.length !== 0 && allQuestionsAnswered) {
			let correctAnswers = 0;
			
			allQuestions.forEach(question => {
				if (question.correct_answer === question.selectedAnswer)
					correctAnswers++;
			});

			setCorrectAnswersCount(correctAnswers);
			setCheckAnswerBtn(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allQuestions]);

    const handleSelectAnswer = (quizId, answer) => {
		if (!isGameOver) {
			setAllQuestions(prevAnswer => (
				prevAnswer.map(question => (
					question.id === quizId
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}

    const checkAnswer = () => {
		if (allQuestions) {
			setIsGameOver(true);

			setAllQuestions(prevQuestionsArray => (
				prevQuestionsArray.map(question => ({...question, showAnswer: true }))
			));
		}
	}

    const resetGame = () => {
		setCheckAnswerBtn(false);
		setIsGameOver(false);
		handleGameStart();
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
            {quizElements}

            <div className="quiz--check">
                {isGameOver &&
					<h3 className="correct-answers-text">
						You scored {correctAnswersCount}/5 correct answers
					</h3>
				}
                <button
					className={`btn ${checkAnswerBtn
                        ? "btn-check-answers"
                        : "btn-check-answers-disabled"}`}
					onClick={isGameOver ? resetGame : checkAnswer}
				>
					{isGameOver ? "Play again" : "Check answers"}
				</button>
            </div>
        </div>
    )
}