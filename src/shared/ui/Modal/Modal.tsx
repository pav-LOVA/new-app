import React, { useEffect} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { type ModalInterface } from '../../../interfaces/modal.inteface';


const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal: React.FC<ModalInterface> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;