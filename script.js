var movieData;

async function renderList(json) {
    var itemCopy = document.getElementsByClassName("movieItem")[0].cloneNode(true);
    var tempHTML = "";
    json.forEach(movie => {
        itemCopy.getElementsByClassName("movieRank")[0].innerHTML = movie.rank
        itemCopy.getElementsByClassName("movieTitle")[0].innerHTML = movie.title
        itemCopy.getElementsByClassName("movieThumb")[0].src = movie.image
        tempHTML += "\n" + itemCopy.outerHTML
    });
    document.getElementById("movieList").innerHTML = tempHTML;
}

async function getJSON() {
    const response = await fetch("movies.json");
    const movieJSON = await response.json()
    return movieJSON
}

getJSON().then(retval => {
    movieData = retval
    renderList(retval)
})

