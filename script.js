var movieData;



async function getJSON() {
    const response = await fetch("movies.json");
    const movieJSON = await response.json()
    return movieJSON
}

async function renderList(json) {
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

function openModal(context, modal) {
    // Update Modal Here
    modal.style.display = "block"
}








var movieModal = document.getElementById("movieModal");
var closeButton = document.getElementsByClassName("closeModal")[0];

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