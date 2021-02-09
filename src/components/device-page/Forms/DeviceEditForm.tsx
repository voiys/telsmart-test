import { FC, FormEventHandler } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BSModal from 'react-bootstrap/Modal';
import { useAppContext } from '../../../context';
import { DeviceBody, MappedDevice } from '../../../types';
import { Button } from '../../shared';

export interface DeviceEditFormProps {
  device: MappedDevice;
  toggleModal: (newState?: boolean) => void;
}

const DeviceEditForm: FC<DeviceEditFormProps> = ({ device, toggleModal }) => {
  const { updateDevice, deviceModels } = useAppContext();

  const editDevice: FormEventHandler = e => {
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const body: DeviceBody = {
      customer: parseInt((data.get('customer') as string) ?? device.customer),
      description: (data.get('description') as string) ?? device.description,
      mac: (data.get('mac') as string) ?? device.mac,
      model: parseInt((data.get('model') as string) ?? device.model.id),
    };

    updateDevice(device.id, body);

    toggleModal(false);
  };

  return (
    <Form onSubmit={editDevice}>
      <BSModal.Body>
        <Row as='p' className='px-3 text-muted'>
          Fields left empty will use their placeholder values.
        </Row>
        <Row className='mb-3'>
          <Col>
            <Form.Control
              type='number'
              placeholder={device.customer.toString()}
              min='1'
              name='customer'
            />
          </Col>

          <Col>
            <Form.Control
              as='select'
              name='model'
              defaultValue={device.model.id}
            >
              {deviceModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Form.Control placeholder={device.description} as='textarea' />
      </BSModal.Body>
      <BSModal.Footer>
        <Button type='submit' variant='success'>
          Confirm
        </Button>
        <Button onClick={() => toggleModal(false)} variant='danger'>
          Cancel
        </Button>
      </BSModal.Footer>
    </Form>
  );
};

export default DeviceEditForm;
