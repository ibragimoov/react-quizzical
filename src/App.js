import { useState } from "react";
import Start from './components/Start'
import QuizList from './components/QuizList'

export default function App() {

    const [gameStart, setGameStart] = useState(false)

    function startGame() {
        setGameStart(prevGameStart => !prevGameStart)
    }

    return (
        <div className='app'>
            {gameStart ? 
                <div className='quiz'>
                    <QuizList />
                </div>
                : <Start gameStart={() => startGame()} />
            }
            <img className='blob-1' src='blob-1.png' alt='blob-1' draggable="false"/>
            <img className='blob-2' src='blob-2.png' alt='blob-2' draggable="false"/>
        </div>
    )
}