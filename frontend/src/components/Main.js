import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__item">
          <div onClick={onEditAvatar} className="profile__avatar">
            <img
              src={currentUser.avatar || "#"}
              className="profile__avatar-img"
              alt="Фото профиля"
            />
          </div>
          <div className="profile__list">
            <div className="profile__flex">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="effecthov profile__edit-button"
              onClick={onEditProfile}
              aria-label="Кнопка редактирования профиля"
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="effecthov profile__add-button"
          onClick={onAddPlace}
          aria-label="Кнопка добавления"
        ></button>
      </section>

      <section className="photo-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
