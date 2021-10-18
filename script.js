var movieData;



async function getJSON() {
    const response = await fetch("movies.json");
    const movieJSON = await response.json()
    return movieJSON
}

function renderList(json) {
    let itemCopy = document.getElementsByClassName("movieItem")[0].cloneNode(true);
    itemCopy.getElementsByClassName("loading")[0].classList.remove("loading")
    let tempHTML = "";
    json.forEach(movie => {
        itemCopy.getElementsByClassName("movieRank")[0].innerHTML = movie.rank
        itemCopy.getElementsByClassName("movieTitle")[0].innerHTML = movie.title
        itemCopy.getElementsByClassName("movieThumb")[0].src = movie.image
        tempHTML += "\n" + itemCopy.outerHTML
    });
    document.getElementById("movieList").innerHTML = tempHTML;
}

function renderModal(number, json) {
    let movieData = json[number-1]
    let modal = document.getElementById("movieModal")
    document.getElementById("mvPoster").src=movieData.image
    document.getElementById("mvTitle").innerHTML=movieData.title
    document.getElementById("mvReleaseDate").innerHTML=movieData.releasedate
    document.getElementById("mvRatingNum").innerHTML=movieData.rating + "/10"
    document.getElementById("movieDesc").innerHTML=movieData.desc
    document.getElementById("imdbpage").href=movieData.link
}

function openModal(context, modal) {
    let itemNum = context.getElementsByClassName("movieRank")[0].innerHTML
    renderModal(itemNum, movieData)    
    modal.style.display = "block"
}








var movieModal = document.getElementById("movieModal");
var closeButton = document.getElementsByClassName("closeModal")[0];


var fullstar = movieModal.getElementsByClassName("fullstar")[0].cloneNode(true)
var halfstar = movieModal.getElementsByClassName("halfstar")[0].cloneNode(true)
var emptystar = movieModal.getElementsByClassName("emptystar")[0].cloneNode(true)

getJSON().then(retval => {
    movieData = retval
    renderList(retval)
})

// When the user clicks on (x), close the modal
closeButton.onclick = function () {
    movieModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == movieModal) {
        movieModal.style.display = "none";
    }
}