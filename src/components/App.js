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
  faLink
} from "@fortawesome/free-solid-svg-icons";

//https://fontawesome.com/how-to-use/on-the-web/using-with/react

library.add(fab, faCheckSquare, faCoffee, faMusic, faLink);

function App() {
  const apiKey = "e387d3c7e9d57238bcacc400d12838b1";
  const apiKeyDB = "523532";
  let categoryDB = "search.php?s";
  let category = "track.search";
  let artistPhotoArray = [];

  const [displayResult, setDisplayResult] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [tracks, setTracks] = useState([""]);
  const [artistInfo, setArtistInfo] = useState("");
  const [artistPhoto, setArtistPhoto] = useState([]);
  const [searchBy, setSearchBy] = useState("artist");
  const [userInput, setUserInput] = useState("");
  const [searchItemHistory, setSearchItemHistory] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const dbRef = firebase.database().ref();

  const handleSearch = () => {
    const urlDB = new URL(
      `https://theaudiodb.com/api/v1/json/${apiKeyDB}/${categoryDB}=${userInput}`
    );
    const url = new URL(`https://ws.audioscrobbler.com/2.0/`);

    if (searchBy === "artist") {
      fetch(urlDB)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.artists == null) {
            alert("No result found");
            setDisplayResult(false);
          } else {
            const data = jsonResponse.artists[0];
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
              website: artistInfoObj.website,
            });
            setDisplayResult(true);
          }
        });
    } else {
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
          const newTrackInfos = jsonResponse.results.trackmatches.track
            .slice(0, 5)
            .map((track) => {
              return {
                mbid: track.mbid,
                title: track.name,
                artist: track.artist,
                lastFMLink: track.url,
              };
            });
          const trackArtists = newTrackInfos.map((track) => {
            return track.artist;
          });
          for (let i = 0; i < 5; i++) {
            const urlDB = `https://theaudiodb.com/api/v1/json/${apiKeyDB}/${categoryDB}=${trackArtists[i]}`;
            fetch(urlDB)
              .then((response) => {
                return response.json();
              })
              .then((jsonResponse) => {
                if (jsonResponse.artists == null) {
                  console.log("NOT FOUND");
                } else {
                  let artistPhoto = jsonResponse.artists[0].strArtistThumb;
                  artistPhotoArray.push(artistPhoto);
                  setArtistPhoto(artistPhotoArray);
                }
              });
          }
          setTracks(newTrackInfos);
          setDisplayResult(true);

          setTimeout(function () {
            setTrigger(!trigger);
          }, 500);
          
        });
    }
  };

  useEffect(() => {
    dbRef.on("value", (res) => {
      const newDataArray = [];
      const data = res.val();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserInput = (event) => {
    let inputValue = event.target.value;
    setUserInput(inputValue);
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

  return (
    <>
      <h1>Find Your Music!</h1>

      <SearchBy handleSearchBy={handleSearchBy} />
      {displaySearch ? (
        <SearchBar
          searchBy={searchBy}
          userInput={userInput}
          handleUserInput={handleUserInput}
          handleSubmitClick={handleSubmitClick}
        />
      ) : (
        <div></div>
      )}

      {displayResult ? (
        <ResultSection
          artistInfo={artistInfo}
          tracks={tracks}
          searchBy={searchBy}
          artistPhoto={artistPhoto}
          artistPhotoArray={artistPhotoArray}
          trigger={trigger}
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
