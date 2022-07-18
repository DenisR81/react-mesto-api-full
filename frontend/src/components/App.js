import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [idCardDelete, setIdCardDelete] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const history = useHistory("");

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard({ ...card, isOpen: true });
  };

  function handleCardDelete(card) {
    setIdCardDelete(card._id);
    setIsConfirmPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
    } else {
      api
        .deleteLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
    }
  }

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .getAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDeleteConfirm() {
    setIsLoading(true);
    api
      .deleteCard(idCardDelete)
      .then(() => {
        setCards((state) => state.filter((ct) => ct._id !== idCardDelete));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIdCardDelete(null);
    setIsConfirmPopupOpen(false);
    setIsLoading(false);
  }

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        tokenCheck();
      }
    });
  };

  const handleRegister = ({ email, password }) => {
    return auth.register(email, password).then(() => {
      setTimeout(() => {
        history.push("/signin");
      }, 3000);
    });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        setLoggedIn(true);
        setUserData(res.data.email);
        history.push("/");
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData(null);
    history.push("/signin");
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  /* React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);*/

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin">
              <Login
                handleLogin={handleLogin}
                tokenCheck={tokenCheck}
                loggedIn={loggedIn}
              />
            </Route>
            <Route exact path="/signup">
              <div className="registerContainer">
                <Register handleRegister={handleRegister} />
              </div>
            </Route>

            <ProtectedRoute exact path="/" loggedIn={setLoggedIn}>
              <Header
                loggedIn={loggedIn}
                userData={userData}
                navText="Выйти"
                navLink="signin"
                signOut={signOut}
              />

              <Main
                userData={userData}
                signOut={signOut}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
        </BrowserRouter>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCardConfirm={handleCardDeleteConfirm}
          isLoading={isLoading}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
