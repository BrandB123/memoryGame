import React, { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const updateCurrentScore = (status) => {
    if (status === 'unclicked'){
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
    } else {
      const newScore = 0;
      setCurrentScore(newScore)
    }
  }

  const updateHighScore = () => {
    if ( currentScore === 0){
      setHighScore(currentScore);
    }
  }

  return (
    <>
      <Header currentScore={ currentScore } highScore={ highScore }/>
    </>
  )
}

function Header({ currentScore, highScore}){

  return (
    <>
      <div class="header">
        <h1>Memory App</h1>
        <p>Current Score: { currentScore }</p>
        <p>High Score: { highScore }</p>
      </div>
    </>
  )
}

function Board(){
  return(
    <h1>This will be a board with 8 tiles.</h1>
    // add tiles
  );
}

function Tile(src, title){
  useEffect(() => {
    // body
  }, [/*dependency array*/])
  
  return(
    <div>
      <img src={ src }/>
      <div>
        {title}
      </div>
    </div>
  );
}

