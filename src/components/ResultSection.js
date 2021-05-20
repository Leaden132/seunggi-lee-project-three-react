import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ResultSection = ({artistPhotoArray, artistPhoto, artistInfo, tracks, searchBy}) => {
    console.log(artistPhoto);

    if (searchBy === 'artist') {
        console.log("art!");
        return(
            <section className = "resultSection">
            <div className = "result">
            <h2>{searchBy}</h2>

            <img className="profilePhoto" src={artistInfo.photo}></img>
            <ul>
                <li><FontAwesomeIcon icon="music" className="music" /> Name: {artistInfo.artistName}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> Alternative Name: {artistInfo.altName}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> Born in: {artistInfo.yearBorn}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> logo: {artistInfo.logo}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> country: {artistInfo.country}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> gender: {artistInfo.gender}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> genre: {artistInfo.genre}</li>
                <li><FontAwesomeIcon icon="music" className="music" /> style: {artistInfo.style}</li>
                <li>facebook: {artistInfo.facebook}</li>
                <li>twitter: {artistInfo.twitter}</li>
                <li>website: {artistInfo.website}</li>
                <li>biography: <p>{artistInfo.biography}</p></li>

            </ul>
            </div>
        </section>
        )
    }

    else {

        return(
            <section className = "resultSection">
            <div className = "result">
            <h2>Result</h2>
            <ul>
                
                            {
                                
                                
                tracks.map((track, index)=>{
                    console.log('CHECK THIS', artistPhoto[index]);
                    console.log(index);
                    console.log(track);
                    return (
                      <li className="track" key={index}>
                        <img src={artistPhotoArray[index]}></img>
                        <p>title: {track.title}</p>
                        <p>artist: {track.artist}</p>
                        <p>last FM Link: {track.lastFMLink}</p>
                      </li>
                    );
                })
            }

            {/* {artistPhoto.map((photo)=>{
                console.log(photo);
                return <img src={photo}></img>;
            })
            } */}

            </ul>
            </div>
        </section>
        )

    }

}

export default ResultSection