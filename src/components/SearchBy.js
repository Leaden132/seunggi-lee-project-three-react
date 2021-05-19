
const SearchBy = ({handleSearchBy}) => {

    return(
    <>
        <div className="searchByContainer">
        <button onClick = {()=>{handleSearchBy('artist')}}id="searchByArtist" className="searchByButton">Artist</button>
        <button onClick = {()=>{handleSearchBy('music')}} id="searchByGenre" className="searchByButton">Music</button>
        </div>
    </>
    )
} 

export default SearchBy;