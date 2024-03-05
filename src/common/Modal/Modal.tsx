import { FC, ReactNode, useEffect } from "react";
import { ModalContent, ModalWrapper } from "./style";
import { createPortal } from "react-dom";

type ModalProps = { isShown?: boolean; children: ReactNode; onClose: () => void; update?: boolean };

const Modal: FC<ModalProps> = ({ isShown, children, onClose, update }) => {
  useEffect(() => {
    // Close popup on Escape key pressed
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);

    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("keydown", closeOnEscapePressed);
    };
  }, []);

  if (!isShown) return null;

  const modalElement = document.getElementById("root");

  function onCloseHandler() {
    if (update) return;
    onClose();
  }

  return createPortal(
    <ModalWrapper $sw_update={update} onClick={onCloseHandler}>
      <ModalContent $sw_update={update} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrapper>,
    modalElement!
  );
};

export default Modal;
