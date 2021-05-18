

const RecentSearches = (props) => {
    return(
        <>
        <h4>Recent Searches</h4>
        <div className = "recentSearches">
        <ul className = "searchContainer">
        {
            props.searches.map((search)=>{
                return(
                    <li className="recentSearch" key ={search.key}>
                        <p>artist: {search.name}</p>
                        <img src=""></img>
                        <button className = "button remove"
               onClick={()=>{props.removeSearch(search.key)}}>Remove Search History</button>
                    </li>
                )
            })
        }
        
        </ul>
        </div>
        </>
    )
}

export default RecentSearches;