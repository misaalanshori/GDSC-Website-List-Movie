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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Your Wishlist"), /*#__PURE__*/React.createElement("p", {
    className: "ltext"
  }, "Movies that you want to watch!"), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: "a"
    },
    className: "wishlistSearchbarActions"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search for a movie title",
    value: searchSentence,
    onChange: event => {
      setSearch(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(ActionButton, {
    style: {
      gridArea: "b"
    },
    logo: /*#__PURE__*/React.createElement("span", {
      className: "fa-solid fa-arrows-rotate actionButton"
    }),
    action: () => {
      favorites.reload();
    }
  }), /*#__PURE__*/React.createElement(ActionButton, {
    style: {
      gridArea: "c"
    },
    logo: /*#__PURE__*/React.createElement("span", {
      className: "fa-solid fa-trash actionButton"
    }),
    action: () => {
      favorites.erase();
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "movieList"
  }, movieFavorites.length ? movieFavorites.map(data => /*#__PURE__*/React.createElement(MovieListObject, {
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
        className: "fa-solid fa-trash actionButton"
      }),
      action: () => {
        favorites.delete(data);
      }
    }),
    appendurl: "."
  })) : /*#__PURE__*/React.createElement("p", {
    className: "ltext"
  }, "Your wishlist is empty!")), modalState.open ? /*#__PURE__*/React.createElement(MovieModalPopUp, {
    mState: modalState,
    closeModal: () => {
      setModalState({
        "open": false,
        "contents": []
      });
    },
    appendurl: "."
  }) : /*#__PURE__*/React.createElement(React.Fragment, null));
}

ReactDOM.render(e(movieApp), document.querySelector('#movieApp'));
ReactDOM.render(e(madeBy), document.querySelector('#madeByCredits'));