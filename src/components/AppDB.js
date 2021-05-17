
import '../styles/App.css';
import firebase from '../config/firebase';

import SearchBar from './SearchBar';
import ResultSection from './ResultSection';
import { useEffect, useState } from 'react';


// *** App Component ***
// Create state items to hold data coming from the third-party API and the user input
// - music API
// - user's search -> userQuery
// - firebase database that stores recent searches

// Once the component has been loaded (mounted) call the local method (displayRecentSearches) to get a list of recent searches from firebase

// A local method (getMusicData) to make the third-party API call with user input
// - when successful, update the state (musicInfo) with new data
// - if unsuccessful, display the error message

// A local method (handleChange) to handle the onChange event to update state (userQuery) with user input

// Render the application
// - header
// - form with user input to find music info
// - use the imported Result component
// - footer

// *** Result Component ***
// Create a component to display data from the third-party API
// This component will get data (music) passed in as props
// Use .map() to render out 10 pieces of data (if there are many musics/authors with that name)





function App() {
  
  
  const apiKeyDB = '1';
  let category = 'search.php?s';
  let artist = '';
  let track = 'believe';
  let sort = '';
  let mbid = '32ca187e-ee25-4f18-b7d0-3b6713f24635'
  let userInput = 'doja';

  const [tracks, setTracks] = useState([]);

  useEffect(
    () => {


const urlDB = new URL(`https://theaudiodb.com/api/v1/json/${apiKeyDB}/${category}=${userInput}`);



      fetch(urlDB)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          console.log(jsonResponse);

          });
console.log("ok");
        //   setTracks(newTrackInfos);

          // // console.log(jsonResponse);
          // // Sometimes...
          // //setArt(jsonResponse.artObjects);
          // // MASSAGE the raw api data into 
          // // a list of objects that works
          // // better for US, because this is our
          // // code and WE'RE IN CHARGE HERE
          // const newArtPieces = jsonResponse.artObjects.map((piece) => {
          //   return {
          //     id: piece.id,
          //     altText: `The piece of art titled ${piece.title}`,
          //     title: piece.longTitle,
          //     imagePath: piece.webImage.url,
          //   }
          // });
          // console.log('Cleaned up art objects list', newArtPieces);
          // console.log('Store this cleaned up list in the Art state value...')
          // setArt(newArtPieces);



        
},
    [] // <-- dependency array 
  );

  console.log(tracks);
  
  return (
    <>
    <h1>Find Your Music!</h1>

    <SearchBar/>
    <ResultSection/>



    </>


  )
}

export default App;
