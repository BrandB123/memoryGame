import React, { useEffect, useState } from 'react'
// import { createClient } from 'pexels';
import imageRequest from './imageRequest'
import './App.css'



// async function imageRequest() {
//   const result = await fetch(
//     `https://api.pexels.com/v1/search?query=Nature&per_page=8&page=1`,
//       {
//         headers: {
//           Authorization: 'fEdd3dOlaQn3a9ZTJy8jG5iAZNZEhiwYqcnh4MrouRygOrhUI11zBK92',
//         },
//       },
//     )
//   return result.json();
// }

// const testing = imageRequest();

// console.log(testing);








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


  // const APICall = {
  //   client : createClient('fEdd3dOlaQn3a9ZTJy8jG5iAZNZEhiwYqcnh4MrouRygOrhUI11zBK92'),
  //   query : 'Nature'
  // }


  return (
    <>
      <Header className='header' currentScore={ currentScore } highScore={ highScore }/>
      <Board className='tileContainer' /*API={ APICall }*//>
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


function Board(/*{ API }*/){
  // const query = API.query;
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   API.client.photos.search({
  //     query, per_page: 8 
  //   }).then(photos => {
  //     const newImages = photos.photos.map((photo) => ({
  //         alt : photo.alt,
  //         src : photo.src.original,
  //       }));
  //       setImages(newImages);
  //   })
  // }, []);


  useEffect(() => {
    imageRequest().then(photos => {
      const newImages = photos.photos.map((photo) => ({
          alt : photo.alt,
          src : photo.src.original,
        }));
        console.log(newImages)
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