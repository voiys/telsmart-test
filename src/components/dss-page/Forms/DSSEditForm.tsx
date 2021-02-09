import { FC, FormEventHandler } from 'react';
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
  const { updateDSS, deviceModels } = useAppContext();

  const editDSS: FormEventHandler = e => {
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const body: DSSBody = {
      device: dss.device,
      dss_type: (data.get('dss_type') as DSSType) ?? dss.dss_type,
      key: parseInt(data.get('key') as string) ?? dss.key,
      label: (data.get('label') as string) ?? dss.label,
      value: (data.get('value') as string) ?? dss.value,
    };

    updateDSS(dss.id, body);

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
            <Form.Control name='label' placeholder={dss.label} />
          </Col>
          <Col>
            <Form.Control
              type='number'
              placeholder={dss.key.toString()}
              min='1'
              name='key'
            />
          </Col>

          <Col>
            <Form.Control
              as='select'
              name='dss_type'
              defaultValue={dss.dss_type}
            >
              {deviceModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Form.Control placeholder={dss.value} name='value' />
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

export default DSSEditForm;
