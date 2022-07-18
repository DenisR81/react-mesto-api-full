import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const linkAvatar = React.useRef();
  React.useEffect(() => {
    linkAvatar.current.value = "";
  }, [props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: linkAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      {...props}
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonTitle="Сохранить"
    >
      <input
        id="avatar"
        type="url"
        ref={linkAvatar}
        name="name"
        defaultValue=""
        placeholder="ссылка на картинку"
        className="popup__fields popup__fields_field_editImgProfile"
        required
      />
      <span
        id="error-avatar"
        className="popup__error-message popup__error-message_visible"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
