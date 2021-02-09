import { FC } from 'react';
import { Button } from '../../shared';
import { Frame } from 'framer';
import { Card, ListGroup } from 'react-bootstrap';
import { DSS as IDSS } from '../../../types';
import { useAppContext } from '../../../context';
import { useModalLogic } from '../../../hooks';
import DSSDeleteModal from '../Modals/DSSDeleteModal';
import DSSEditModal from '../Modals/DSSEditModal';

export interface DSSProps {
  index: number;
  reorder: (startIndex: number, endIndex: number) => void;
  dss: IDSS;
}

const DSS: FC<DSSProps> = ({ index, dss, reorder }) => {
  const { displayedDSSs } = useAppContext();
  const [showDeleteModal, toggleDeleteModal] = useModalLogic();
  const [showEditModal, toggleEditModal] = useModalLogic();

  return (
    <Frame width='1fr' height='1fr' background='none'>
      <Card className='mb-5'>
        <Card.Header>
          <Card.Title as='h2'>ID: {dss.id}</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Label: {dss.label}</ListGroup.Item>
            <ListGroup.Item>Value: {dss.value}</ListGroup.Item>
            <ListGroup.Item>Type: {dss.dss_type}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between'>
          {!(index - 1 < 0) && (
            <Button onClick={() => reorder(index, index - 1)}>Move up</Button>
          )}
          {index !== displayedDSSs.length - 1 && (
            <Button onClick={() => reorder(index, index + 1)}>Move down</Button>
          )}
          <Button onClick={() => toggleEditModal(true)} variant='secondary'>
            Edit DSS
          </Button>
          <Button variant='danger' onClick={() => toggleDeleteModal(true)}>
            Delete DSS
          </Button>
        </Card.Footer>
      </Card>
      <DSSEditModal
        show={showEditModal}
        toggleModal={toggleEditModal}
        dss={dss}
      />
      <DSSDeleteModal
        show={showDeleteModal}
        toggleModal={toggleDeleteModal}
        dss={dss}
      />
    </Frame>
  );
};

export default DSS;
