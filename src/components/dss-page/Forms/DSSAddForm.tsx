import { FC, FormEventHandler, useState } from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { DSSBody, DSSType } from '../../../types';
import { Button } from '../../shared';

interface DSSAddFormProps {
  deviceId: number;
}

const DSSAddForm: FC<DSSAddFormProps> = ({ deviceId }) => {
  const { addDSS } = useAppContext();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const body: DSSBody = {
      device: deviceId,
      key: parseInt(data.get('key') as string),
      label: data.get('label') as string,
      value: data.get('value') as string,
      dss_type: data.get('dss_type') as DSSType,
    };

    addDSS(body);

    form.reset();
    setSubmitting(false);
  };

  return (
    <Form className='w-100' onSubmit={handleSubmit}>
      <Row className='px-3 mb-3'>
        <h2>Add a new DSS</h2>
      </Row>
      <Row className='d-flex justify-content-between mb-3'>
        <Col>
          <Form.Control
            placeholder='Label'
            name='label'
            required
            disabled={isSubmitting}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder='Key'
            type='number'
            name='key'
            min='1'
            required
          />
        </Col>
        <Col>
          <Form.Control
            as='select'
            defaultValue='SPD'
            name='dss_type'
            required
            disabled={isSubmitting}
          >
            <option value='SPD'>SPD</option>
            <option value='BLF'>BLF</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className='px-3 mb-3'>
        <Form.Control
          placeholder='Value'
          name='value'
          required
          disabled={isSubmitting}
        />
      </Row>
      <Button type='submit' className='d-block ml-auto' disabled={isSubmitting}>
        Add new DSS
      </Button>
    </Form>
  );
};

export default DSSAddForm;
