import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      {...props}
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonTitle="Сохранить"
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        id="name"
        type="text"
        name="name"
        placeholder="имя"
        className="popup__fields popup__fields_field_name"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        id="error-name"
        className="popup__error-message popup__error-message_visible"
      ></span>
      <input
        value={description || ""}
        onChange={handleChangeDescription}
        id="work"
        type="text"
        name="work"
        placeholder="о себе"
        className="popup__fields popup__fields_field_work"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        id="error-work"
        className="popup__error-message popup__error-message_visible"
      ></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
