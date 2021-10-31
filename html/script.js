// function to load the json
async function getJSON() {
  const response = await fetch("movies.json");
  const movieJSON = await response.json();
  return movieJSON;
} // ReactJS section starts here


const e = React.createElement;
const emojis = ["❤️", "🩸", "🕒", "🧠", "💪"];
const stars = [/*#__PURE__*/React.createElement("span", {
  className: "fullstar fa fa-solid fa-star"
}), /*#__PURE__*/React.createElement("span", {
  className: "halfstar fa fa-solid fa-star-half-stroke"
}), /*#__PURE__*/React.createElement("span", {
  className: "emptystar fa fa-regular fa-star"
})]; // this is a component for the star ratings, still have not figured out any better way to do this

function StarRating(props) {
  function drawStars(star) {
    starRating = [];
    let starNum = star;
    let currentStar = 0;

    while (currentStar < 10) {
      if (starNum - 1 > 0) {
        starRating.push(0);
        starNum -= 1;
        currentStar += 1;
      } else if (starNum == 1) {
        starRating.push(0);
        starNum -= 1;
        currentStar += 1;
      } else if (starNum > 0 && starNum < 1) {
        starRating.push(1);
        starNum = 0;
        currentStar += 1;
      } else {
        starRating.push(2);
        currentStar += 1;
      }
    }

    return starRating;
  } // there is a key prop problem here, not sure how to solve it. but it works so lets just leave it for now :)


  return /*#__PURE__*/React.createElement("div", {
    className: "star"
  }, drawStars(props.rating).map(starNum => stars[starNum]));
} // a component for each movie on the list


function MovieListObject(props) {
  if (props.search == "" || props.search.every(term => props.movieInfo.title.toLowerCase().includes(term.toLowerCase()))) {
    return /*#__PURE__*/React.createElement("div", {
      className: "movieItem",
      onClick: () => {
        props.openModal(props.movieInfo);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "stext movieRank"
    }, props.movieInfo["rank"]), /*#__PURE__*/React.createElement("img", {
      className: "movieThumb",
      src: props.movieInfo["image"]
    }), /*#__PURE__*/React.createElement("a", {
      className: "stext movieTitle"
    }, props.movieInfo["title"]));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
} // the modal popup component


function MovieModalPopUp(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "closeModal",
    onClick: props.closeModal
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "modalContent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "movieInfo"
  }, /*#__PURE__*/React.createElement("img", {
    className: "moviePoster",
    src: props.mState.contents.image
  }), /*#__PURE__*/React.createElement("div", {
    className: "aboutMovie"
  }, /*#__PURE__*/React.createElement("a", {
    className: "sltext"
  }, props.mState.contents.title), /*#__PURE__*/React.createElement("span", {
    className: "sltext block"
  }, props.mState.contents.releasedate), /*#__PURE__*/React.createElement(StarRating, {
    rating: props.mState.contents.rating
  }), /*#__PURE__*/React.createElement("a", {
    className: "sltext"
  }, props.mState.contents.rating, "/10"))), /*#__PURE__*/React.createElement("div", {
    className: "movieDesc"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "sltext"
  }, "Description:"), /*#__PURE__*/React.createElement("p", {
    className: "sltext"
  }, props.mState.contents.desc), /*#__PURE__*/React.createElement("a", {
    className: "centerText boldText kindabigText",
    href: props.mState.contents.link,
    target: "_blank"
  }, "IMDB Page"))));
} // Main component, contains child components for the the search bar, movie list, and modal


function movieApp() {
  const [searchSentence, setSearch] = React.useState("");
  const [modalState, setModalState] = React.useState({
    "open": false,
    "contents": []
  });
  const searchTerm = searchSentence.split(" ");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Top 20 Movies"), /*#__PURE__*/React.createElement("p", {
    className: "ltext"
  }, "Top 20 Movies, data sourced from the IMDB (Now with ReactJS!)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search for a movie title",
    value: searchSentence,
    onChange: event => {
      setSearch(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "movieList"
  }, movieData.map(data => /*#__PURE__*/React.createElement(MovieListObject, {
    key: data["rank"],
    movieInfo: data,
    search: searchTerm,
    openModal: () => {
      setModalState({
        "open": true,
        "contents": data
      });
    }
  }))), modalState.open ? /*#__PURE__*/React.createElement(MovieModalPopUp, {
    mState: modalState,
    closeModal: () => {
      setModalState({
        "open": false,
        "contents": []
      });
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null));
} // a lil easter egg i guess? its also just a reference component for the other components im making


function madeBy() {
  const [state, setState] = React.useState(0);

  function updateState() {
    if (state != emojis.length - 1) {
      setState(state + 1);
    } else {
      setState(0);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "stext centerText",
    onClick: updateState
  }, "Made with ", emojis[state], " by ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/misaalanshori",
    target: "_blank"
  }, "M Isa Al Anshori")));
} // this is where the code *really* starts


var movieData; // Starting point for rendering the list

getJSON().then(retval => {
  movieData = retval;
  ReactDOM.render(e(movieApp), document.querySelector('#movieApp'));
  ReactDOM.render(e(madeBy), document.querySelector('#madeByCredits'));
});