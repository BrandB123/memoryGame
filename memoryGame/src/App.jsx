import React, { useEffect, useRef, useState } from 'react'
import imageRequest from './imageRequest'
import './App.css'


export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [images, setImages] = useState([]);
  

  const states = { currentScore, highScore, images};
  const updateStates = { setCurrentScore, setHighScore, setImages };

  return (
    <>
      <Header className='header' currentScore={ currentScore } highScore={ highScore } />
      <Board className='tileContainer' states={ states } updateStates={ updateStates }/>
      <Message states={ states } updateStates={ updateStates } />
      <Footer />
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


function Board({ states, updateStates }){
  useEffect(() => {
    imageRequest().then(photos => {
      const newImages = photos.photos.map((photo) => ({
          alt : photo.alt,
          id : photo.id,
          src : photo.src.original,
          status : false
        }));
        updateStates.setImages(newImages);
    })
  }, []);
  return(
    <div className='board'>
      { states.images.length > 0 ?
          states.images.map((image, index) =>{
            return <Tile key={image.id} src={ image.src } alt={ image.alt } index={index} states={ states } updateStates={ updateStates }/>
        }) : <p className="loadingMessage">Loading ...</p>
      }
    </div> 
  );
}


function Tile({src, alt, index, states, updateStates}){
  const updateCurrentScore = () => {
    if (states.images[index].status != true && states.currentScore < 8){
      updateStates.setCurrentScore(states.currentScore + 1)
      states.images[index].status = true;
    } else if(states.currentScore === 8){
      return
    } else {
      updateStates.setCurrentScore(0);
      states.images.forEach((image) => {
        image.status = false
      })
    };
  }

  useEffect(()  => {
    if (states.currentScore > states.highScore){
      updateStates.setHighScore(states.currentScore)
    }
  }, [states.currentScore])
  
  return(
    <div className='tile' onClick={ updateCurrentScore }>
      <img src={ src } alt={ alt }/>
    </div>
  );
}


function Message({ states, updateStates}){
  const messageRef = useRef(null)
  const shuffleFactor = Math.round(Math.random()*7)

  const shuffleIndex = (index, shuffleFactor) => {
    return ((index + shuffleFactor) % 8)
  }

  useEffect(()  => {
    if (states.currentScore >= 8){
      messageRef.current.textContent = "You Win!!"
      messageRef.current.style.backgroundColor = 'rgb(0, 255, 0, 65%)'
      messageRef.current.style.visibility = 'visible'
    } else if (states.currentScore < 1){
      messageRef.current.textContent = 'Click icons to earn points. Click each tile exactly once to win!';
    } else {
      messageRef.current.style.visibility = 'hidden'
      const shuffledImages = [
        states.images[shuffleIndex(0, shuffleFactor)],
        states.images[shuffleIndex(1, shuffleFactor)],
        states.images[shuffleIndex(2, shuffleFactor)],
        states.images[shuffleIndex(3, shuffleFactor)],
        states.images[shuffleIndex(4, shuffleFactor)],
        states.images[shuffleIndex(5, shuffleFactor)],
        states.images[shuffleIndex(6, shuffleFactor)],
        states.images[shuffleIndex(7, shuffleFactor)]
      ]
      updateStates.setImages(shuffledImages);
    }
  }, [states.currentScore])

  return(
    <div ref={ messageRef } className='message'>
    </div>
  );
}


function Footer(){
  return (
    <div className='footer'>
      <a href="https://www.pexels.com">Photos provided by Pexels</a>
    </div>
  );
}