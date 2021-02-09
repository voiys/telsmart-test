import { FC } from 'react';
import { useAppContext } from '../../../context';
import { Button, Modal } from '../../shared';
import BSModal from 'react-bootstrap/Modal';
import { MappedDevice } from '../../../types';
import { Row } from 'react-bootstrap';

export interface DeviceDeleteModalProps {
  toggleModal: (newState?: boolean) => void;
  show: boolean;
  device: MappedDevice;
}

const DeviceDeleteModal: FC<DeviceDeleteModalProps> = ({
  show,
  device,
  toggleModal,
}) => {
  const { deleteDevice: deleteDeviceAction } = useAppContext();

  const deleteDevice = () => {
    deleteDeviceAction(device.id);

    toggleModal(false);
  };

  return (
    <Modal show={show} title={`Delete device ${device.mac}`}>
      <BSModal.Body>
        <Row as='p' className='px-3'>
          Are you sure you want to delete {device.mac}?
        </Row>
      </BSModal.Body>
      <BSModal.Footer>
        <Button onClick={deleteDevice}>Confirm</Button>
        <Button onClick={() => toggleModal(false)} variant='danger'>
          Cancel
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

export default DeviceDeleteModal;
