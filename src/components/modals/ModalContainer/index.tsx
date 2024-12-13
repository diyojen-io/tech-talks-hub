'use client';

import LoginModal from '@/components/Modals/LoginModal';
import SignUpModal from '@/components/Modals/SignUpModal';
import { useModalContext } from '@/context/ModalContext';
import React from 'react';

const ModalContainer: React.FC = () => {
  const { isModalOpen, closeModal } = useModalContext();

  return (
    <>
      <LoginModal
        onClose={() => closeModal('login')}
        isOpen={isModalOpen('login')}
      />
      <SignUpModal
        onClose={() => closeModal('signup')}
        isOpen={isModalOpen('signup')}
      />
    </>
  );
};

export default ModalContainer;
