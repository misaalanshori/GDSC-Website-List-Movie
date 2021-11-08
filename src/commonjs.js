JSONStorage = {
    "write": (objName, contents) => {
        window.localStorage.setItem(objName, JSON.stringify(contents.filter(Boolean)))
        return JSONStorage.read(objName)
    },
    "read": (objName) => {
        let data = JSON.parse(window.localStorage.getItem(objName))
        return data ? data.filter(Boolean) : []
    }}


    
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
  
function ActionButton(prop) {
    return (
        <span className="actionButton" onClick={prop.action}>
            {prop.logo}
        </span>
    )

}

function MovieListObject(props) {
    
    if ((props.search == "") || (props.search.every(term => props.movieInfo.title.toLowerCase().includes(term.toLowerCase())))) {
        return (<>
            <div className="movieItem" >
                <span className="movieItemContents" onClick={() => {props.openModal(props.movieInfo)}}>
                    <span className="stext movieRank">{props.movieInfo["rank"]}</span>
                    <img className="movieThumb" src={props.movieInfo["image"]}></img>
                    <a className="stext movieTitle">{props.movieInfo["title"]}</a>  
                </span>
                       
                    {props.action}    
            </div>

            </>
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