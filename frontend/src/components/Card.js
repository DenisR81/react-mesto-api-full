import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? "place__heart_active" : "";

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className="place">
      <img
        src={card.link}
        className="effecthov place__photo"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="place__list">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like">
          <button
            type="button"
            className={`effecthov place__heart ${cardLikeButtonClassName}`}
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <span className={`place__like-count`}>{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="effecthov place__urn"
          aria-label="Удаление"
          onClick={handleDeleteClick}
        ></button>
      )}
    </article>
  );
}

export default Card;
