import { FC, FormEventHandler, useState } from 'react';
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
  const [isSubmitting, setSubmitting] = useState(false);

  const editDevice: FormEventHandler = e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const customer = parseInt(data.get('customer') as string);
    const model = parseInt(data.get('model') as string);
    const mac = data.get('mac') as string;
    const description = data.get('description') as string;
    const body: DeviceBody = {
      customer: isNaN(customer) ? device.customer : customer,
      description:
        description != null && description.length !== 0
          ? description
          : device.description,
      mac: mac !== '' ? mac : device.mac,
      model: isNaN(model) ? device.model.id : model,
    };

    updateDevice(device.id, body);
    setSubmitting(false);
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
              disabled={isSubmitting}
            />
          </Col>

          <Col>
            <Form.Control
              as='select'
              name='model'
              defaultValue={device.model.id}
              disabled={isSubmitting}
            >
              {deviceModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Row className='mb-3 px-3'>
          <Form.Control name='mac' placeholder={device.mac} />
        </Row>
        <Row className='mb-3 px-3'>
          <Form.Control
            placeholder={device.description}
            as='textarea'
            disabled={isSubmitting}
            name='description'
          />
        </Row>
      </BSModal.Body>
      <BSModal.Footer>
        <Button type='submit' variant='success' disabled={isSubmitting}>
          Confirm
        </Button>
        <Button
          onClick={() => toggleModal(false)}
          variant='danger'
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </BSModal.Footer>
    </Form>
  );
};

export default DeviceEditForm;
