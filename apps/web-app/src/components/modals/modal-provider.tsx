"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useModalStore } from "@/store/modal-store";
import AuthModal from "./auth-modal";

export const ModalProvider = () => {
  const searchParams = useSearchParams();
  const { openModal, closeModal, type } = useModalStore();

  useEffect(() => {
    const auth = searchParams.get("auth");

    if (auth === "login" || auth === "signup") {
      openModal("auth");
      return;
    }

    if (type === "auth") {
      closeModal();
    }
  }, [searchParams, openModal, closeModal, type]);

  return (
    <Suspense fallback={null}>
      <AuthModal />
    </Suspense>
  );
};
