import type { ReactNode } from "react";

export interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}