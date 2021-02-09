import { FC } from 'react';
import { DSS } from '../../../types';
import { Modal } from '../../shared';
import DSSEditForm from '../Forms/DSSEditForm';

export interface DSSEditModalProps {
  show: boolean;
  toggleModal: (newState?: boolean) => void;
  dss: DSS;
}

const DSSEditModal: FC<DSSEditModalProps> = ({ show, toggleModal, dss }) => {
  return (
    <Modal show={show} title={`Edit DSS ${dss.id}`}>
      <DSSEditForm dss={dss} toggleModal={toggleModal} />
    </Modal>
  );
};

export default DSSEditModal;
