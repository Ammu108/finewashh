import { create } from "zustand";

export type ModalType = "auth" | null;

interface ModalState {
  type: ModalType;
  isOpen: boolean;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  isOpen: false,
  openModal: (type) => set({ type, isOpen: true }),
  closeModal: () => set({ type: null, isOpen: false }),
}));
