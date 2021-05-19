
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
  const apiKeyDB = '523532';
  let categoryDB = 'search.php?s';
  let category = 'track.search';
  let track = 'believe';

  
  const [displayResult, setDisplayResult] = useState(false);
  const [tracks, setTracks] = useState(['']);
  const [artistInfo, setArtistInfo] = useState('');
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



      if (searchBy === 'artist'){
        console.log("WORKED!");

            const urlDB = new URL(`https://theaudiodb.com/api/v1/json/${apiKeyDB}/${categoryDB}=${userInput}`);

          fetch(urlDB).then((response)=>{
            return response.json();
          }).then ((jsonResponse)=>{


            if (jsonResponse.artists == null){
              console.log(jsonResponse.artists)
              console.log("NOT FOUND");
            }

            else {
              const data = jsonResponse.artists[0]
              console.log(data);
                setArtistInfo({
                  artistName : data.strArtist,
                  altName : data.strArtistAlternate,
                  yearBorn : data.intBornYear,
                  //yearborn is same as yearformed for bands
                  yearFormed : data.intFormedYear,
                  memberCount : data.intMembers,
                  photo : data.strArtistClearart,
                  logo : data.strArtistLogo,
                  biography : data.strBiographyEN,
                  country : data.strCountry,
                  gender : data.strGender,
                  genre : data.strGenre,
                  style : data.strStyle,
                  facebook : data.strFacebook,
                  twitter : data.strTwitter,
                  website : data.strWebsite,
                }) 
            }
          })

      }

      else {

const url = new URL(`http://ws.audioscrobbler.com/2.0/`);

      const searchParams = new URLSearchParams(
        {
          method: category,
          api_key: apiKey,
          track: userInput,
          format: 'json',
        }
      );

      if (false) {
        //key , value .... S stands for sort in the api documentation
        searchParams.append('s', 'sort');
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
            }
          });

          console.log(newTrackInfos);
          setTracks(newTrackInfos);
          console.log(tracks);

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

    setDisplayResult(true);

    // setUserInput('');
  }

    const handleRemoveSearch = (search) => {
    dbRef.child(search).remove();

  };

    const handleSearchBy = (search) => {
      setSearchBy(search);
      setDisplayResult(false);

    }


  console.log(searchBy);
  console.log(userInput);
  console.log(tracks);
  
  return (
    <>
    <h1>Find Your Music!</h1>


    <SearchBy handleSearchBy = {handleSearchBy}/>
    <SearchBar searchBy = {searchBy} userInput = {userInput} handleUserInput = {handleUserInput} handleSubmitClick={handleSubmitClick}/>


    { displayResult 
    ? (
      <ResultSection artistInfo = {artistInfo} tracks = {tracks} searchBy = {searchBy}/>
    )
    :<div className = "result"></div>

}
    <RecentSearches searchBy = {searchBy} searches={searches} removeSearch = {handleRemoveSearch}/>
    <Footer/>


    </>


  )
}

export default App;
