import {
  Button,
  Container,
  ControlsContainer,
  ControlsHeader,
} from '../../shared';
import { FC } from 'react';
import { useAppContext } from '../../../context';
import { useLocation } from 'react-router-dom';
import DSSAddForm from '../Forms/DSSAddForm';

const DSSControls: FC = () => {
  const { homePageNavigated } = useAppContext();
  const { pathname } = useLocation();

  const deviceId = pathname.match(/\d+/)?.pop() ?? '';

  const goBack = () => {
    homePageNavigated();
  };

  return (
    <ControlsContainer>
      <ControlsHeader title={`Direct Station Selection: ${deviceId}`} />
      <Container>
        <DSSAddForm deviceId={parseInt(deviceId)} />
      </Container>
      <Container alignment='end'>
        <Button variant='secondary' onClick={goBack}>
          Go back
        </Button>
      </Container>
    </ControlsContainer>
  );
};

export default DSSControls;
