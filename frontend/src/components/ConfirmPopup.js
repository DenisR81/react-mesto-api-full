import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCardConfirm();
  }
  return (
    <PopupWithForm
      {...props}
      name="card-delete"
      title="Вы уверены?"
      buttonTitle="Да"
      buttonTitleIsLoading="Удаление..."
      onSubmit={handleSubmit}
    />
  );
}
export default ConfirmPopup;
