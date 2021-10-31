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
function StarRating(props) {
    function drawStars(star) {
        starRating = []
        let starNum = star
        let currentStar = 0;
        while (currentStar < 10) {
            if (starNum - 1 > 0) {
                starRating.push(0)
                starNum -= 1
                currentStar += 1
            } else if (starNum == 1) {
                starRating.push(0)
                starNum -= 1
                currentStar += 1
            } else if (starNum > 0 && starNum < 1) {
                starRating.push(1)
                starNum = 0
                currentStar += 1
            } else {
                starRating.push(2)
                currentStar += 1
            }
        }
        return starRating
    }
    // there is a key prop problem here, not sure how to solve it. but it works so lets just leave it for now :)
    return (
        <div className="star"> 
            {drawStars(props.rating).map((starNum) => stars[starNum])}
        </div>
    )
}

// a component for each movie on the list
function MovieListObject(props) {

    if ((props.search == "") || (props.search.every(term => props.movieInfo.title.toLowerCase().includes(term.toLowerCase())))) {
        return (
            <div className="movieItem" onClick={() => {props.openModal(props.movieInfo)}}>
                <span className="stext movieRank">{props.movieInfo["rank"]}</span>
                <img className="movieThumb" src={props.movieInfo["image"]}></img>
                <a className="stext movieTitle">{props.movieInfo["title"]}</a>
            </div>
        )
    } else {
        return (<></>)
    }
}

// the modal popup component
function MovieModalPopUp(props) {
    return (
    <div className="modal">

        <span className="closeModal" onClick={props.closeModal}>&times;</span>
        <div className="modalContent">
            
            <div className="movieInfo">

                <img className="moviePoster" src={props.mState.contents.image}/>

                <div className="aboutMovie"> 
                    <a className="sltext">{props.mState.contents.title}</a>
                    <span className="sltext block">{props.mState.contents.releasedate}</span>
                    <StarRating rating={props.mState.contents.rating}/>
                    <a className="sltext">{props.mState.contents.rating}/10</a>
                </div>
            
            </div>

            <div className="movieDesc">
                <h4 className="sltext">Description:</h4>
                <p className="sltext">{props.mState.contents.desc}</p>
                <a className="centerText boldText kindabigText" href={props.mState.contents.link} target="_blank">IMDB Page</a>
            </div>

        </div>
    
    </div>
    )
}

// Main component, contains child components for the the search bar, movie list, and modal
function movieApp() {
    const [searchSentence, setSearch] = React.useState("")
    const [modalState, setModalState] = React.useState({"open": false, "contents": []})
    const searchTerm = searchSentence.split(" ") 

    return (<>

        <h1>Top 20 Movies</h1>
        <p className="ltext">Top 20 Movies, data sourced from the IMDB (Now with ReactJS!)</p>

        <input type="text" placeholder="Search for a movie title" value={searchSentence} onChange={(event) => {setSearch(event.target.value)}} />

        <div className="movieList">
            {movieData.map((data)=>
            <MovieListObject 
                key={data["rank"]} 
                movieInfo={data} 
                search={searchTerm} 
                openModal={() => {setModalState({"open": true, "contents": data})}}
            />)}
        </div>

        {modalState.open ? <MovieModalPopUp 
        mState={modalState} 
        closeModal={()=>{setModalState({"open": false, "contents": []})}}
        /> : <></>}

    </>)
}




// a lil easter egg i guess? its also just a reference component for the other components im making
function madeBy() {
  
  const [state, setState] = React.useState(0)

  function updateState() {
    if (state != emojis.length - 1) {
      setState(state + 1)
    } else {
      setState(0)
    }
  }

  return (<>
    <p className="stext centerText" onClick={updateState}>
        Made with {emojis[state]} by <a href="https://github.com/misaalanshori" target="_blank">M Isa Al Anshori</a>
    </p>
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

