
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

        },
        erase: () => {
            setMovieFavorites(JSONStorage.write("favorites", []))
        },
        reload: () => {
            setMovieFavorites(JSONStorage.read("favorites"))
        }
    }

    React.useEffect(
        () => {
            window.addEventListener("storage", favorites.reload, false)
            return () => {window.removeEventListener("storage", favorites.reload)}
        }
    )

    return (<>

        <h1>Your Wishlist</h1>
        <p className="ltext">Movies that you want to watch!</p>
        <div style={{gridArea: "a"}} className="wishlistSearchbarActions">
            <input 
            type="text" 
            placeholder="Search for a movie title" 
            value={searchSentence} 
            onChange={(event) => {setSearch(event.target.value)}} />
        <ActionButton style={{gridArea: "b"}} logo={<span className="fa-solid fa-arrows-rotate actionButton"></span>} action={() => {favorites.reload()}}/>
        <ActionButton style={{gridArea: "c"}} logo={<span className="fa-solid fa-trash actionButton"></span>} action={() => {favorites.erase()}}/>
        </div>
        

        <div className="movieList">
            {movieFavorites.length ? movieFavorites.map((data)=>
            
            <MovieListObject 
                key={data["uniqueKey"]} 
                movieInfo={data} 
                search={searchTerm} 
                openModal={() => {setModalState({"open": true, "contents": data})}}
                action={<ActionButton logo={<span className="fa-solid fa-trash actionButton"></span>} action={() => {favorites.delete(data)}}/>}
                appendurl="."
            />) : <p className="ltext">Your wishlist is empty!</p>}
        </div>

        {modalState.open 
        ? <MovieModalPopUp 
        mState={modalState} 
        closeModal={()=>{setModalState({"open": false, "contents": []})}}
        appendurl="."
        /> 
        : <></>}
    </>)
}


ReactDOM.render(e(movieApp), document.querySelector('#movieApp'));
ReactDOM.render(e(madeBy), document.querySelector('#madeByCredits'));
