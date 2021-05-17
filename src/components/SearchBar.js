

const SearchBar = () => {


    return (

        <>


        <form>

                    <label for='userInput' className='sr-only'>Search bar</label>
                    <input type='text' name="userInput" id='userInput' placeholder="Search msuic / artist" required></input>
                    <button type="submit" className="submitButton">Search</button>
        </form>



        </>

    )
}


export default SearchBar