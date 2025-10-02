"use client";

import React from "react";
import ClientOnlyPortal from "@/components/clientOnlyPortal/ClientOnlyPortal";
import { useModalStore } from "@/store/modal/useModalStore";
import BackModal from "@/components/modal/backModal/BackModal";
import InfoModal from "@/components/modal/infoModal/InfoModal";
import LogoutModal from "@/components/modal/logoutModal/LogoutModal";
import DeleteAccountModal from "@/components/modal/deleteAccountModal/DeleteAccountModal";
import DeleteModal from "./deleteModal/DeleteModal";

export default function UnifiedModalRenderer() {
  const { currentModal, closeModal } = useModalStore();

  return (
    <ClientOnlyPortal containerId="modal">
      <BackModal isOpen={currentModal === "back"} onClose={closeModal} />
      <InfoModal isOpen={currentModal === "info"} onClose={closeModal} />
      <LogoutModal isOpen={currentModal === "logout"} onClose={closeModal} />
      <DeleteModal isOpen={currentModal === "delete"} onClose={closeModal} />
      <DeleteAccountModal isOpen={currentModal === "deleteAccount"} onClose={closeModal} />
    </ClientOnlyPortal>
  );
}