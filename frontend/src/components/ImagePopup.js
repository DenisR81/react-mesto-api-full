import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_img ${props.card.isOpen && "popup_opened"}`}
    >
      <div className="popup__list">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__text">{props.card.name}</h2>
        <button
          type="button"
          className="effecthov popup__btn-close popup__btn-close_img"
          onClick={props.onClose}
          aria-label="Кнопка закрытия формы"
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
