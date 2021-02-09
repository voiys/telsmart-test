import { FC, FormEventHandler } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { DeviceBody } from '../../../types';
import { Button } from '../../shared';

const DeviceAddForm: FC = () => {
  const { addDevice, deviceModels } = useAppContext();

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const body: DeviceBody = {
      customer: parseInt(data.get('customer') as string),
      description: (data.get('description') as string) ?? '',
      mac: data.get('mac') as string,
      model: parseInt(data.get('model') as string),
    };

    addDevice(body);

    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit} className='w-100'>
      <Row className='px-3 mb-3'>
        <h2>Add a new device</h2>
      </Row>
      <Row className='d-flex justify-content-between px-3'>
        <Form.Group controlId='customer' className='d-flex w-50'>
          <Form.Control
            placeholder='Customer ID'
            name='customer'
            type='number'
            min='1'
            required
          />
        </Form.Group>
        <Form.Group className='w-25' controlId='model'>
          <Form.Control as='select' name='model' required defaultValue={1}>
            {deviceModels.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Row>
      <Form.Group controlId='mac'>
        <Form.Control placeholder='MAC address' name='mac' required />
      </Form.Group>
      <Form.Group controlId='description'>
        <Form.Control
          placeholder='Description'
          as='textarea'
          name='description'
        />
      </Form.Group>
      <Button type='submit' className='d-block ml-auto'>
        Add new device
      </Button>
    </Form>
  );
};

export default DeviceAddForm;
