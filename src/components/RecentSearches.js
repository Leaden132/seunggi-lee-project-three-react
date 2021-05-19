

const RecentSearches = ({searchBy, searches, searchItemHistory, handleRemoveSearch}) => {



    return(
        <>
        <h4>Recently Searched artists</h4>
        <div className = "recentSearches">
        <ul className = "searchContainer">
        {
            searchItemHistory.map((search)=>{
                return (
                  <li className="recentSearch" key={search.key}>
                    <img className="recentItem" src={search.image}></img>
                    <a href={search.link}>
                      <span>{search.name}</span>
                    </a>
                    <button
                      className="button remove"
                      onClick={() => {
                        handleRemoveSearch(search.key);
                      }}
                    >
                      X
                    </button>
                  </li>
                );
            })
        }
        
        </ul>
        </div>
        </>
    )
}

export default RecentSearches;