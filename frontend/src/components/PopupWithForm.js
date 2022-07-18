import React from "react";

function PopupWithForm(props) {
  const buttonTitleIsLoading = props.buttonTitleIsLoading || "Сохранение...";
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__profile">
        <h2 className="popup__title">{props.title}</h2>
        <button
          type="button"
          className="effecthov popup__btn-close"
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__container popup__container_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__edit">{props.children}</fieldset>
          <button
            className={`effecthov popup__btn-save popup__btn-save_type_${props.name}`}
            type="submit"
          >
            {props.isLoading ? buttonTitleIsLoading : props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
