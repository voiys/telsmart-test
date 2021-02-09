import { FC } from 'react';
import { MappedDevice } from '../../../types';
import { Modal } from '../../shared';
import DeviceEditForm from '../Forms/DeviceEditForm';

export interface DeviceEditModalProps {
  show: boolean;
  device: MappedDevice;
  toggleModal: (newState?: boolean) => void;
}

const DeviceEditModal: FC<DeviceEditModalProps> = ({
  show,
  device,
  toggleModal,
}) => {
  return (
    <Modal show={show} title={`Edit device ${device.mac}`}>
      <DeviceEditForm device={device} toggleModal={toggleModal} />
    </Modal>
  );
};

export default DeviceEditModal;
