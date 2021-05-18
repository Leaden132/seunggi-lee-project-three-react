
import '../styles/App.css';
import firebase from '../config/firebase';
import SearchBy from './SearchBy';
import SearchBar from './SearchBar';
import ResultSection from './ResultSection';
import RecentSearches from './RecentSearches';
import Footer from './Footer';
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
  
  
  const apiKey = 'e387d3c7e9d57238bcacc400d12838b1';
  const apiKeyDB = '1';
  let categoryDB = 'search.php?s';
  let category = 'track.search';
  let artist = '';
  let track = 'believe';
  let sort = '';
  

  const [tracks, setTracks] = useState([]);
  const [searchBy, setSearchBy] = useState('artist');
  const [searches, setSearches] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [submit, setSubmit] = useState(true);

  const dbRef = firebase.database().ref();

  useEffect(
    () => {

      dbRef.on('value',(res)=>{
      const newDataArray = [];
      const data = res.val();
      for (let key in data) {
        // console.log({key: key, name: data[key]});
        let searches = {key:key, name: data[key]};
        newDataArray.unshift(searches);
        
      }
      setSearches(newDataArray);
    })



      if (true){
            const urlDB = new URL(`https://theaudiodb.com/api/v1/json/${apiKeyDB}/${categoryDB}=${userInput}`);

          fetch(urlDB).then((response)=>{
            return response.json();
          }).then ((jsonResponse)=>{
            console.log(jsonResponse);

            


          })

      }
      else {

const url = new URL(`http://ws.audioscrobbler.com/2.0/`);

      const searchParams = new URLSearchParams(
        {
          method: category,
          api_key: apiKey,
          // artist: artist,
          track: track,
          format: 'json',
        }
      );

      if (false) {
        //key , value .... S stands for sort in the api documentation
        searchParams.append('s', sort);
      }
      url.search = searchParams;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          console.log(jsonResponse);

          const newTrackInfos = jsonResponse.results.trackmatches.track.map((track) => {
            return {
              mbid: track.mbid,
              title: track.name,
              artist: track.artist,
              lastFMLink: track.url,
              image: '',
            }
          });

          console.log(newTrackInfos);
          setTracks(newTrackInfos);


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
        })
      }
    },
    [submit] // <-- dependency array 
  );
  


    const handleUserInput = (event) => {
    let inputValue = event.target.value;
    setUserInput(inputValue);
    console.log(userInput)
  }

    const handleSubmitClick = (event) => {
    event.preventDefault();

    // const dbRef = firebase.database().ref();
    dbRef.push(userInput);
    setSubmit(!submit);

    // setUserInput('');
  }

    const handleRemoveSearch = (search) => {
    dbRef.child(search).remove();

  };

    const handleSortByArtistClick = () => {
    console.log('track!');
    setSearchBy('track');
  }

    const handleSortChronoClick = () => {
    console.log('artist!');
    setSearchBy('artist');
  }




  console.log(searchBy);
  console.log(userInput);
  
  return (
    <>
    <h1>Find Your Music!</h1>


    <SearchBy/>
    <SearchBar userInput = {userInput} handleUserInput = {handleUserInput} handleClick={handleSubmitClick}/>
    <ResultSection/>
    <RecentSearches searches={searches} removeSearch = {handleRemoveSearch}/>
    <Footer/>


    </>


  )
}

export default App;
