

import React, { useEffect, useState } from 'react';
import './App.css';
import alienImage from './Images/alien.jpg';
import explosionImage from './Images/explosion.jpg';
 
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false); 
  const [userName, setUserName] = useState(''); // New state for user name
  const [score, setScore] = useState(0); // New state for score
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [explosion, setExplosion] = useState(false);




  const displayAliens = () => {
    let alienImages = [];
    for (let i = 0; i < wrongAnswers; i++) {
      alienImages.push(<img key={i} src={alienImage} alt="Alien" />);
    }
    return alienImages;
};

const displayExplosion = () => {
  let explosionImages = [];
  for (let i = 0; i < 1; i++) {
    explosionImages.push(<img key={i} src={explosionImage} alt="Explosion" />);
  }
  return <img src={explosionImage} alt="Explosion" className="explosion-image" />;
};

const handleRestart = () => {
  setQuestions([]);
  setCurrentQuestionIndex(0);
  setPlayerPosition(0);
  setGameOver(false);
  setUserName('');
  setScore(0);
  setWrongAnswers(0);
  setExplosion(false);
  // Fetch new questions if needed, or other initialization logic

  fetch('/api/questions')
    .then(response => response.json())
    .then(data => setQuestions(data));
};

  useEffect(() => {
    // Fetch questions from your server
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestionIndex].answer) {
      setPlayerPosition(playerPosition + 1); // Move up
      setScore(prevScore => prevScore + 1); // Increase score
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setPlayerPosition(playerPosition - 1); // Move down
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true); // End the game when questions run out
    }
    if (wrongAnswers >= 5) {
      setExplosion(true);
      setGameOver(true);
    }
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle name submission logic
  };
  if (!userName) {
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>
            Enter your name:
            <input type="text" name ="userName" value = {userName} onChange={e => setUserName(e.target.value)} />
          </label>
          <button type="submit">Start Game</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">

      {displayAliens()}
      {explosion && displayExplosion()}

       <h1>Trivia Ladder Game</h1>
      <p>Welcome, {userName}!</p>
      <p> If you get a question wrong an alien invasion begins! Too many Aliens and ...</p>
      <p>Current Score: {score}</p>
      {gameOver ? (
         <>
         <p>Game Over</p>
         <button onClick={handleRestart} className="restart-button">Restart Game</button>
         </>
      ) : (
        questions.length > 0 && (
          <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        )
      )}
    </div>
  );
}



export default App;
