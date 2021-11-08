// function to load the json
async function getJSON() {
  const response = await fetch("movies.json");
  const movieJSON = await response.json();
  return movieJSON;
} // ReactJS section starts here
// this is a component for the star ratings, still have not figured out any better way to do this
// a component for each movie on the list


function FloatingWatchLater(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fa-solid fa-clapperboard floatContents"
  }), /*#__PURE__*/React.createElement("div", {
    className: "dropdown-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wishlistActions"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sltext",
    style: {
      gridArea: "a"
    }
  }, "Wishlist:"), /*#__PURE__*/React.createElement(ActionButton, {
    style: {
      gridArea: "b"
    },
    logo: /*#__PURE__*/React.createElement("span", {
      className: "fa-solid fa-up-right-from-square actionButton-small"
    }),
    action: () => {
      window.open("wishlist");
    }
  }), /*#__PURE__*/React.createElement(ActionButton, {
    style: {
      gridArea: "c"
    },
    logo: /*#__PURE__*/React.createElement("span", {
      className: "fa-solid fa-arrows-rotate actionButton-small"
    }),
    action: () => {
      props.refresh();
    }
  })), props.contents.length ? props.contents.map(data => /*#__PURE__*/React.createElement(MovieListObject, {
    key: data["uniqueKey"],
    movieInfo: data,
    search: "",
    openModal: () => {
      props.modalOpener(data);
    },
    action: /*#__PURE__*/React.createElement(ActionButton, {
      logo: /*#__PURE__*/React.createElement("span", {
        className: "fa-solid fa-trash actionButton"
      }),
      action: () => {
        props.favorite.delete(data);
      }
    })
  })) : /*#__PURE__*/React.createElement("p", {
    className: "ltext"
  }, "Your wishlist is empty!")));
} // Main component, contains child components for the the search bar, movie list, and modal


function movieApp() {
  const [searchSentence, setSearch] = React.useState("");
  const [modalState, setModalState] = React.useState({
    "open": false,
    "contents": []
  });
  const [movieFavorites, setMovieFavorites] = React.useState(JSONStorage.read("favorites"));
  const searchTerm = searchSentence.split(" ");

  const uniqueCheck = (arr, obj) => {
    return;
  };

  favorites = {
    add: obj => {
      if (movieFavorites.some(element => {
        return element.uniqueKey == obj.uniqueKey;
      })) {
        alert("That movie is already added!");
      } else {
        setMovieFavorites(JSONStorage.write("favorites", [...movieFavorites, obj]));
      }
    },
    delete: obj => {
      let currentArray = movieFavorites;
      delete currentArray[currentArray.indexOf(obj)];
      setMovieFavorites(JSONStorage.write("favorites", currentArray));
    },
    erase: () => {
      setMovieFavorites(JSONStorage.write("favorites", []));
    },
    reload: () => {
      setMovieFavorites(JSONStorage.read("favorites"));
    }
  };
  React.useEffect(() => {
    window.addEventListener("storage", favorites.reload, false);
    return () => {
      window.removeEventListener("storage", favorites.reload);
    };
  });
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
    key: data["uniqueKey"],
    movieInfo: data,
    search: searchTerm,
    openModal: () => {
      setModalState({
        "open": true,
        "contents": data
      });
    },
    action: /*#__PURE__*/React.createElement(ActionButton, {
      logo: /*#__PURE__*/React.createElement("span", {
        className: "fa-solid fa-plus actionButton"
      }),
      action: () => {
        favorites.add(data);
      }
    })
  }))), modalState.open ? /*#__PURE__*/React.createElement(MovieModalPopUp, {
    mState: modalState,
    closeModal: () => {
      setModalState({
        "open": false,
        "contents": []
      });
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement(FloatingWatchLater, {
    modalOpener: dat => setModalState({
      "open": true,
      "contents": dat
    }),
    contents: movieFavorites,
    refresh: favorites.reload,
    favorite: favorites
  }));
} // this is where the code *really* starts


var movieData; // Starting point for rendering the list

getJSON().then(retval => {
  movieData = retval;
  ReactDOM.render(e(movieApp), document.querySelector('#movieApp'));
  ReactDOM.render(e(madeBy), document.querySelector('#madeByCredits'));
}); // this code is complete garbage, im so sorry that you had to read all that