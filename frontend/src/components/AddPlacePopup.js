import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChengeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({ name: name, link: link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      {...props}
      name="add-picture"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonTitle="Сохранить"
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        id="addname"
        type="text"
        name="addname"
        placeholder="название"
        className="popup__fields popup__fields_field_addname"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        id="error-addname"
        className="popup__error-message popup__error-message_visible"
      ></span>
      <input
        value={link || ""}
        onChange={handleChengeLink}
        id="link"
        type="url"
        name="addlink"
        placeholder="ссылка на картинку"
        className="popup__fields popup__fields_field_addlink"
        required
      />
      <span
        id="error-link"
        className="popup__error-message popup__error-message_visible"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
