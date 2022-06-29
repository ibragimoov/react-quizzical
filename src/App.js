import { useState } from "react";
import Start from './components/Start'
import QuizList from './components/QuizList'

export default function App() {

    const [gameStart, setGameStart] = useState(false)
    const [showNoQuestionsError, setShowNoQuestionsError] = useState(false);

    function startGame() {
        setGameStart(prevGameStart => !prevGameStart)
    }

    const handleGameStart = () => setGameStart(prevState => !prevState);
    const handleNoQuestionsError = boolean => setShowNoQuestionsError(boolean);

    return (
        <div className='app'>
            {gameStart ? 
                <div className='quiz'>
                    <QuizList 
                        handleGameStart={handleGameStart}
                        handleNoQuestionsError={handleNoQuestionsError}/>
                </div>
                : <div>
                    {showNoQuestionsError &&
                        <h2 className="noQuiz-error">
                            {'Oops! We couldn\'t find questions!\nRestart pls'}
                        </h2>
                    }
                    <Start gameStart={() => startGame()} />
                </div>
            }
            {!gameStart && <img className='blob-1' src='blob-1.png' alt='blob-1' draggable="false"/>}
            {!gameStart && <img className='blob-2' src='blob-2.png' alt='blob-2' draggable="false"/>}
        </div>
    )
}