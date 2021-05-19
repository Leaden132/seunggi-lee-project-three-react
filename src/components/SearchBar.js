
const SearchBar = ({searchBy, userInput, handleUserInput, handleSubmitClick}) => {

    if (searchBy ==='artist') {
        return(
                    <div>
        <form className="search artistSearch" onSubmit={handleSubmitClick}>
                    <label htmlFor='userInput' className='searchLabel'>Search Artist</label>
                    <input type='text' name="userInput" id='userInput' className="searchInput" placeholder="Enter Artist Name" value = {userInput} onChange = {handleUserInput} required></input>
                    <button type="submit" className="submitButton">Search</button>
        </form>
        </div>
        )
    }

    else {
    return (

        <div>
        <form className="search musicSearch" onSubmit={handleSubmitClick}>
                    <label htmlFor='userInput' className='searchLabel'>Search Music</label>
                    <input type='text' name="userInput" id='userInput' className="searchInput" placeholder="Enter Music Title" value = {userInput} onChange = {handleUserInput} required></input>
                    <button type="submit" className="submitButton" >Search</button>
        </form>
        </div>

    )
    }

}


export default SearchBar;