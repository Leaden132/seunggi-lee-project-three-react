
const SearchBar = ({searchBy, userInput, handleUserInput, handleSubmitClick}) => {

    if (searchBy ==='artist') {
        return(
                    <div>
        <form className="search artistSearch">
                    <label htmlFor='userInput' className='searchLabel'>Search Artist</label>
                    <input type='text' name="userInput" id='userInput' className="searchInput" placeholder="Search music / artist" value = {userInput} onChange = {handleUserInput} required></input>
                    <button type="submit" className="submitButton" onClick={handleSubmitClick}>Search</button>
        </form>
        </div>
        )
    }

    else {
    return (

        <div>
        <form className="search musicSearch">
                    <label htmlFor='userInput' className='searchLabel'>Search Music</label>
                    <input type='text' name="userInput" id='userInput' className="searchInput" placeholder="Search msuic / artist" value = {userInput} onChange = {handleUserInput} required></input>
                    <button type="submit" className="submitButton" onClick={handleSubmitClick}>Search</button>
        </form>
        </div>

    )
    }

}


export default SearchBar;