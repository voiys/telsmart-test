import { FC } from 'react';
import { Row } from 'react-bootstrap';
import BSModal from 'react-bootstrap/Modal';
import { useAppContext } from '../../../context';
import { DSS } from '../../../types';
import { Modal, Button } from '../../shared';

export interface DSSDeleteModalProps {
  show: boolean;
  toggleModal: (newState?: boolean) => void;
  dss: DSS;
}

const DSSDeleteModal: FC<DSSDeleteModalProps> = ({
  show,
  toggleModal,
  dss,
}) => {
  const { deleteDSS: deleteDSSAction } = useAppContext();

  const deleteDSS = () => {
    deleteDSSAction(dss.id);
    toggleModal(false);
  };

  return (
    <Modal show={show} title={`Delete DSS ${dss.id}?`} centered>
      <BSModal.Body>
        <Row as='p' className='px-3'>
          Are you sure you want to delete DSS {dss.id}?
        </Row>
      </BSModal.Body>
      <BSModal.Footer>
        <Button onClick={deleteDSS}>Confirm</Button>
        <Button variant='danger' onClick={() => toggleModal(false)}>
          Cancel
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

export default DSSDeleteModal;
