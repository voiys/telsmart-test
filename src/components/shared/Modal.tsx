import { FC } from 'react';
import BSModal, { ModalProps as BSModalProps } from 'react-bootstrap/Modal';

export interface ModalProps extends BSModalProps {
  title: string;
}

const Modal: FC<ModalProps> = ({
  children,
  title,
  onConfirm,
  onCancel,
  ...props
}) => {
  return (
    <BSModal {...props} centered>
      <BSModal.Header>
        <BSModal.Title>{title}</BSModal.Title>
      </BSModal.Header>
      {children}
    </BSModal>
  );
};

export default Modal;
