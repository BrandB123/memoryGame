import React, { useEffect, useState } from 'react'
import imageRequest from './imageRequest'
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
      <Board className='tileContainer' />
      <Instructions />
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


function Board(){
  const [images, setImages] = useState([]);

  useEffect(() => {
    imageRequest().then(photos => {
      const newImages = photos.photos.map((photo) => ({
          alt : photo.alt,
          src : photo.src.original,
        }));
        setImages(newImages);
    })
  }, []);
  return(
    <div className='board'>
      { images.length > 0 ?
          images.map((image) =>{
            return <Tile src={image.src} alt={image.alt}/>
        }) : <p className="loadingMessage">Loading ...</p>
      }
    </div> 
  );
}


function Tile({src, alt}){
  return(
    <div className='tile' >
      <img src={ src } alt={ alt }/>
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


function Footer(){
  return (
    <div className='footer'>
      <a href="https://www.pexels.com">Photos provided by Pexels</a>
    </div>
  );
}