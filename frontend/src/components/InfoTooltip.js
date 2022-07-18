import React from "react";
import complite from "../images/complite.svg";
import error from "../images/error.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup  ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__tooltip popup__container_type_tooltip">
        <img
          src={props.success ? complite : error}
          alt="Картинка"
          className="tooltip__img"
        />
        <h2 className="tooltip__name tooltip__name-txt">
          {props.success
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          type="button"
          className="effecthov popup__btn-close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
