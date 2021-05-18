
const SearchBar = (props) => {


    return (

        <>


        <form>

                    <label htmlFor='userInput' className='sr-only'>Search bar</label>
                    <input type='text' name="userInput" id='userInput' placeholder="Search msuic / artist" value = {props.userInput} onChange = {props.handleUserInput} required></input>
                    <button type="submit" className="submitButton" onClick={props.handleClick}>Search</button>
        </form>



        </>

    )
}


export default SearchBar