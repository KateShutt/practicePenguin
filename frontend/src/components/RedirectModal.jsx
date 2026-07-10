import Modal from "react-modal";
import { useState } from "react";

function RedirectModal({ isOpen, title, message, buttonText, onButtonClick }) {
  return (
    // must wrap in modal tag!!
    <Modal isOpen={isOpen}>
      <h1>{title}</h1>
      <p>{message}</p>
      <button type="button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </Modal>
  );
}
export default RedirectModal;
