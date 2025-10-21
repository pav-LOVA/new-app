import React, { useEffect, type ReactNode} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalI {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal: React.FC<ModalI> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
} = ({ isOpen, onClose, children }) => {
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

Modal.Header = ({ children }) => <div className={styles.header}>{children}</div>;
Modal.Body = ({ children }) => <div className={styles.body}>{children}</div>;
Modal.Footer = ({ children }) => <div className={styles.footer}>{children}</div>;

export default Modal;