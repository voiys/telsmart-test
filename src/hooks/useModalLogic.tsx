import { useState } from 'react';

type UseModalLogic = [boolean, (newState?: boolean) => void];
type UseModalLogicSignature = () => UseModalLogic;

export const useModalLogic: UseModalLogicSignature = () => {
  const [show, set] = useState(false);

  const toggleModal = (newState?: boolean) => {
    if (newState) {
      set(newState);
    } else {
      set(!show);
    }
  };

  return [show, toggleModal];
};
