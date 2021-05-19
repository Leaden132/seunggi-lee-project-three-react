


const ResultSection = ({artistInfo, tracks, searchBy}) => {
    console.log(tracks);

    if (searchBy === 'artist') {
        console.log("art!");
        return(
            <section className = "resultSection">
            <div className = "result">
            <h2>{searchBy}</h2>

            <img className="profilePhoto" src={artistInfo.photo}></img>
            <ul>
                <li>Name: {artistInfo.artistName}</li>
                <li>Alternative Name: {artistInfo.altName}</li>
                <li>Born in: {artistInfo.yearBorn}</li>
                <li>logo: {artistInfo.logo}</li>
                <li>country: {artistInfo.country}</li>
                <li>gender: {artistInfo.gender}</li>
                <li>genre: {artistInfo.genre}</li>
                <li>style: {artistInfo.style}</li>
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
                tracks.map((track)=>{
                    return(
                        <li className="track" key={track.mbid}>
                            <p>title: {track.title}</p>
                            <p>artist: {track.artist}</p>
                            <p>last FM Link: {track.lastFMLink}</p>
                        </li>
                    )
                })
            }
            </ul>
            </div>
        </section>
        )

    }

}

export default ResultSection