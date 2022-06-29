import {useEffect} from 'react'
import { nanoid } from "nanoid";
import { decode } from 'html-entities';

export default function QuizAnswer(props) {
    const incorrectAnswersElements = props.incorrectAnswers.map(answer => {
		const incorrectAnswerClassName = `
			${props.selectedAnswer === answer ? "quiz-btn-selected quiz--btn quiz--answers" : "quiz--btn quiz--answers"}
			${(props.showAnswer && props.selectedAnswer === answer) && "quiz-btn-incorrect quiz--btn quiz--answers"}
		`;

		return <button
			key={nanoid()}
			className={incorrectAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, answer)}
		>
			{ decode(answer) }
		</button>
	});

	const correctAnswerClassName = `
		${props.selectedAnswer === props.correctAnswer ? "quiz-btn-selected quiz--btn quiz--answers" : "quiz--btn quiz--answers"}
		${props.showAnswer && "quiz--btn quiz--answers quiz-btn-correct"}
	`;

	const correctAnswerElement =
		<button
			key={nanoid()}
			className={correctAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
		>
			{ decode(props.correctAnswer) }
		</button>
	
	incorrectAnswersElements.push(correctAnswerElement);

	const sortedAnswerElements = incorrectAnswersElements.sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);
  
    return (
        <div className='quiz--container'>
            <h3 className='quiz--title'>
                {decode(props.question)}
            </h3>
            {sortedAnswerElements}
        </div>
    )
}

// className='quiz--btn quiz--answers'