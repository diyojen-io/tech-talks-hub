"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ModalContextType {
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});

  const openModal = useCallback((modalId: string) => {
    setOpenModals(prev => ({ ...prev, [modalId]: true }));
  }, []);

  const closeModal = useCallback((modalId: string) => {
    setOpenModals(prev => ({ ...prev, [modalId]: false }));
  }, []);

  const isModalOpen = useCallback(
    (modalId: string) => openModals[modalId],
    [openModals]
  );

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
