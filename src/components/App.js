
import './App.css';
import '../styles/App.css';
import firebase from '../config/firebase';



// *** App Component ***
// Create state items to hold data coming from the third-party API and the user input
// - music API
// - user's search -> userQuery
// - firebase database that stores recent searches

// Once the component has been loaded (mounted) call the local method (displayRecentSearches) to get a list of recent searches from firebase

// A local method (getMusicData) to make the third-party API call with user input
// - when successful, update the state (musicInfo) with new data
// - if unsuccessful, display the error message

// A local method (handleChange) to handle the onChange event to update state (userQuery) with user input

// Render the application
// - header
// - form with user input to find music info
// - use the imported Result component
// - footer

// *** Result Component ***
// Create a component to display data from the third-party API
// This component will get data (music) passed in as props
// Use .map() to render out 10 pieces of data (if there are many musics/authors with that name)





function App() {
  
  
  
  
  
  
  return (
    <>
    <h1>Find Your Music!</h1>
    



    </>


  )
}

export default App;
