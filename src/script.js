// function to load the json
async function getJSON() {
    const response = await fetch("movies.json");
    const movieJSON = await response.json()
    return movieJSON
}



// ReactJS section starts here
const e = React.createElement;
const emojis = ["❤️","🩸","🕒","🧠","💪"] 
const stars = [
    (<span className="fullstar fa fa-solid fa-star"></span>),
    (<span className="halfstar fa fa-solid fa-star-half-stroke"></span>),
    (<span className="emptystar fa fa-regular fa-star"></span>)
] 

// this is a component for the star ratings, still have not figured out any better way to do this


// a component for each movie on the list




function FloatingWatchLater(props) {
    return (
        <div className="dropdown">

            <span className="fa-solid fa-clapperboard floatContents"></span>

            <div className="dropdown-content">
                <p className="sltext">Wishlist:</p>
                {props.contents.map((data) => <MovieListObject 
                key={data["uniqueKey"]} 
                movieInfo={data} 
                search= {""}
                openModal={() => {props.modalOpener(data)}}
                action={<ActionButton logo={<span className="fa-solid fa-trash actionButton"></span>} action={() => {props.favorite.delete(data)}}/>}
            />)}
            </div>
        </div>
  
    )
}

// Main component, contains child components for the the search bar, movie list, and modal
function movieApp() {
    const [searchSentence, setSearch] = React.useState("")
    const [modalState, setModalState] = React.useState({"open": false, "contents": []})
    const [movieFavorites, setMovieFavorites] = React.useState(JSONStorage.read("favorites"))
    const searchTerm = searchSentence.split(" ") 

    const uniqueCheck = (arr, obj) => {
        return 
    }

    favorites = {
        add: (obj) => {
            if (movieFavorites.some((element)=>{return element.uniqueKey == obj.uniqueKey})) {
                alert("That movie is already added!")
            } else {
                setMovieFavorites(JSONStorage.write("favorites", [...movieFavorites, obj]))
            }
        },
        delete: (obj) => {
            let currentArray = movieFavorites
            delete currentArray[currentArray.indexOf(obj)]
            setMovieFavorites(JSONStorage.write("favorites", currentArray))

        }
    }

    return (<>

        <h1>Top 20 Movies</h1>
        <p className="ltext">Top 20 Movies, data sourced from the IMDB (Now with ReactJS!)</p>

        <input 
        type="text" 
        placeholder="Search for a movie title" 
        value={searchSentence} 
        onChange={(event) => {setSearch(event.target.value)}} />

        <div className="movieList">
            {movieData.map((data)=>
            
            <MovieListObject 
                key={data["uniqueKey"]} 
                movieInfo={data} 
                search={searchTerm} 
                openModal={() => {setModalState({"open": true, "contents": data})}}
                action={<ActionButton logo={<span className="fa-solid fa-plus actionButton"></span>} action={() => {favorites.add(data)}}/>}
            />)}
        </div>

        {modalState.open 
        ? <MovieModalPopUp 
        mState={modalState} 
        closeModal={()=>{setModalState({"open": false, "contents": []})}}/> 
        : <></>}
        <FloatingWatchLater modalOpener = {(dat) => setModalState({"open": true, "contents": dat})} contents={movieFavorites} favorite={favorites}/>
    </>)
}





// this is where the code *really* starts

var movieData;
// Starting point for rendering the list
getJSON().then(retval => {
    movieData = retval
    ReactDOM.render(e(movieApp), document.querySelector('#movieApp'));
    ReactDOM.render(e(madeBy), document.querySelector('#madeByCredits'));
})


// this code is complete garbage, im so sorry that you had to read all that