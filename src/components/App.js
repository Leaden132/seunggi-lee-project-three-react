import "../styles/App.css";
import firebase from "../config/firebase";
import SearchBy from "./SearchBy";
import SearchBar from "./SearchBar";
import ResultSection from "./ResultSection";
import RecentSearches from "./RecentSearches";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

//https://fontawesome.com/how-to-use/on-the-web/using-with/react

library.add(fab, faCheckSquare, faCoffee, faMusic);

function App() {
  const apiKey = "e387d3c7e9d57238bcacc400d12838b1";
  const apiKeyDB = "523532";
  let categoryDB = "search.php?s";
  let category = "track.search";
  let track = "believe";
  let artistPhotoArray = [];

  const [displayResult, setDisplayResult] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [tracks, setTracks] = useState([""]);
  const [artistInfo, setArtistInfo] = useState("");
  const [artistPhoto, setArtistPhoto] = useState([]);
  const [searchBy, setSearchBy] = useState("artist");
  const [userInput, setUserInput] = useState("");
  const [searchItemHistory, setSearchItemHistory] = useState([]);

  const dbRef = firebase.database().ref();

  const handleSearch = () => {
    const urlDB = new URL(
      `https://theaudiodb.com/api/v1/json/${apiKeyDB}/${categoryDB}=${userInput}`
    );
    const url = new URL(`http://ws.audioscrobbler.com/2.0/`);
    
    
    if (searchBy === "artist") {
      console.log("WORKED!");

      fetch(urlDB)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.artists == null) {
            console.log(jsonResponse.artists);
            console.log("NOT FOUND");
            setDisplayResult(false);
          } else {
            const data = jsonResponse.artists[0];
            console.log(data);
            let artistInfoObj = {
              artistName: data.strArtist,
              altName: data.strArtistAlternate,
              yearBorn: data.intBornYear,
              //yearborn is same as yearformed for bands
              yearFormed: data.intFormedYear,
              memberCount: data.intMembers,
              photo: data.strArtistThumb,
              logo: data.strArtistLogo,
              biography: data.strBiographyEN,
              country: data.strCountry,
              gender: data.strGender,
              genre: data.strGenre,
              style: data.strStyle,
              facebook: data.strFacebook,
              twitter: data.strTwitter,
              website: data.strWebsite,
            };

            setArtistInfo(artistInfoObj);
            dbRef.push({
              photo: artistInfoObj.photo,
              artistName: artistInfoObj.artistName,
              website: artistInfoObj.website
            });

            setDisplayResult(true);
          }
        });
    } 
    
    
    else {
      const searchParams = new URLSearchParams({
        method: category,
        api_key: apiKey,
        track: userInput,
        format: "json",
      });

      url.search = searchParams;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          console.log(jsonResponse);

          const newTrackInfos = jsonResponse.results.trackmatches.track.slice(0, 5).map(
            (track) => {
              return {
                mbid: track.mbid,
                title: track.name,
                artist: track.artist,
                lastFMLink: track.url,
              };
            }
          );
            console.log(newTrackInfos)
            
            const trackArtists = newTrackInfos.map((track)=>{
              return track.artist;
            })

            for (let i = 0; i < 5; i++){
              const urlDB = `https://theaudiodb.com/api/v1/json/${apiKeyDB}/${categoryDB}=${trackArtists[i]}`;
              fetch(urlDB)
                .then((response) => {
                  return response.json();
                })
                .then((jsonResponse) => {
                  if (jsonResponse.artists == null) {
                    console.log("NOT FOUND");
                  } else {
                    let artistPhoto = jsonResponse.artists[0].strArtistThumb
                    artistPhotoArray.push(artistPhoto);
                    console.log(artistPhotoArray);
                    
                  }
                });
            }
          
          console.log("WATCH THIS", artistPhoto);
          setTracks(newTrackInfos);
          setDisplayResult(true);
        });
    }
  };

  useEffect(
    () => {
      dbRef.on("value", (res) => {
        const newDataArray = [];
        const data = res.val();
        console.log(data);

        for (let key in data) {
          let searchObj = {
            key: key,
            image: data[key].photo,
            name: data[key].artistName,
            link: data[key].website,
          };

          newDataArray.unshift(searchObj);
        }
        setSearchItemHistory(newDataArray);
      });
    },
    [] // <-- dependency array
  );

  const handleUserInput = (event) => {
    let inputValue = event.target.value;
    setUserInput(inputValue);
    console.log(userInput);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    handleSearch();
  };
  const handleRemoveSearch = (search) => {
    dbRef.child(search).remove();
  };

  const handleSearchBy = (search) => {
    setSearchBy(search);
    setDisplayResult(false);
    setDisplaySearch(true);

  };

  console.log(searchBy);
  console.log(userInput);
  console.log(tracks);

  return (
    <>
      <h1>Find Your Music!</h1>

      <SearchBy handleSearchBy={handleSearchBy} />
      {
        displaySearch ? (
          <SearchBar
        searchBy={searchBy}
        userInput={userInput}
        handleUserInput={handleUserInput}
        handleSubmitClick={handleSubmitClick}
      />
        ) : (
          <div></div>
        )
      }


      {displayResult ? (
        <ResultSection
          artistInfo={artistInfo}
          tracks={tracks}
          searchBy={searchBy}
          artistPhoto={artistPhoto}
          artistPhotoArray={artistPhotoArray}
        />
      ) : (
        <div className="result">
          <h2>No result</h2>
        </div>
      )}
      <RecentSearches
        searchBy={searchBy}
        searchItemHistory={searchItemHistory}
        handleRemoveSearch={handleRemoveSearch}
      />
      <Footer />
    </>
  );
}

export default App;
