import React, { useEffect, useState } from 'react'
import example from './assets/images/stockimage.jpg'
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
      <Header className='header' currentScore={ currentScore } highScore={ highScore }/>
      <Board className='tileContainer'/>
      <Instructions />
    </>
  )
}

function Header({ currentScore, highScore}){

  return (
    <>
      <div className="header">
        <h1 className='headerTitle'>Memory App</h1>
        <p className='currentScore'>Current Score: { currentScore }</p>
        <p className='highScore'>High Score: { highScore }</p>
      </div>
    </>
  )
}

function Board(){
  return(
    <div className='board'>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
        <Tile src={ example } title='title'/>
    </div> 
  );
}

function Tile({src, title}){
  // useEffect(() => {
  //   // body
  // }, [/*dependency array*/])
  
  return(
    <div className='tile' >
      <img src={ src } alt='this will pull from an API'/>
      <div className='imageTitle'>
        {title}
      </div>
    </div>
  );
}

function Instructions(){
  return(
    <div className='instructions'>
      Click icons to earn points. Click each tile exactly once to win!
    </div>
  );
}