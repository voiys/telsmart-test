import { FC, FormEventHandler, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BSModal from 'react-bootstrap/Modal';
import { useAppContext } from '../../../context';
import { DSSBody, DSS, DSSType } from '../../../types';
import { Button } from '../../shared';

export interface DSSEditFormProps {
  dss: DSS;
  toggleModal: (newState?: boolean) => void;
}

const DSSEditForm: FC<DSSEditFormProps> = ({ dss, toggleModal }) => {
  const { updateDSS } = useAppContext();
  const [isSubmitting, setSubmitting] = useState(false);

  const editDSS: FormEventHandler = e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const key = parseInt(data.get('key') as string);
    const label = data.get('label') as string;
    const value = data.get('value') as string;
    const body: DSSBody = {
      device: dss.device,
      dss_type: (data.get('dss_type') as DSSType) ?? dss.dss_type,
      key: isNaN(key) ? dss.key : key,
      label: label !== '' ? label : dss.label,
      value: value !== '' ? value : dss.value,
    };

    updateDSS(dss.id, body);
    setSubmitting(false);

    toggleModal(false);
  };

  return (
    <Form onSubmit={editDSS}>
      <BSModal.Body>
        <Row as='p' className='px-3 text-muted'>
          Fields left empty will use their placeholder values.
        </Row>
        <Row className='mb-3'>
          <Col>
            <Form.Control
              name='label'
              placeholder={dss.label}
              disabled={isSubmitting}
            />
          </Col>
          <Col>
            <Form.Control
              type='number'
              placeholder={dss.key.toString()}
              min='1'
              name='key'
              disabled={isSubmitting}
            />
          </Col>

          <Col>
            <Form.Control
              as='select'
              name='dss_type'
              defaultValue={dss.dss_type}
              disabled={isSubmitting}
            >
              {['BLF', 'SPD'].map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Form.Control
          placeholder={dss.value}
          name='value'
          disabled={isSubmitting}
        />
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

export default DSSEditForm;
