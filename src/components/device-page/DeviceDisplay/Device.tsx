import { FC } from 'react';
import { Frame } from 'framer';
import { Card, ListGroup } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { MappedDevice as IDevice } from '../../../types';
import { formatModelFormat } from '../../../utils';
import { Button } from '../../shared';
import { useModalLogic } from '../../../hooks';
import DeviceEditModal from '../Modals/DeviceEditModal';
import DeviceDeleteModal from '../Modals/DeviceDeleteModal';

export interface DeviceProps {
  device: IDevice;
}

const Device: FC<DeviceProps> = ({ device }) => {
  const { dssPageNavigated } = useAppContext();
  const [showEditModal, toggleEditModal] = useModalLogic();
  const [showDeleteModal, toggleDeleteModal] = useModalLogic();

  const visitDevice = () => {
    dssPageNavigated(device.id);
  };

  return (
    <>
      <Frame width='1fr' height='1fr'>
        <Card>
          <Card.Header>
            <Card.Title as='h2'>{device.model.name}</Card.Title>
            <Card.Subtitle className='text-muted'>
              {formatModelFormat(device.model.device_format)} -{' '}
              {device.model.vendor}
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>Customer: {device.customer}</ListGroup.Item>
              <ListGroup.Item>MAC: {device.mac}</ListGroup.Item>
              <ListGroup.Item>Description: {device.description}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer className='d-flex justify-content-around'>
            <Button className='mr-3' onClick={visitDevice}>
              Visit device
            </Button>
            <Button
              className='mr-3'
              variant='secondary'
              onClick={() => toggleEditModal(true)}
            >
              Edit device
            </Button>
            <Button variant='danger' onClick={() => toggleDeleteModal(true)}>
              Delete device
            </Button>
          </Card.Footer>
        </Card>
      </Frame>
      <DeviceDeleteModal
        show={showDeleteModal}
        toggleModal={toggleDeleteModal}
        device={device}
      />
      <DeviceEditModal
        show={showEditModal}
        toggleModal={toggleEditModal}
        device={device}
      />
    </>
  );
};

export default Device;
