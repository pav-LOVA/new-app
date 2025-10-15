import type { ReactNode } from "react";

export interface ModalI {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}