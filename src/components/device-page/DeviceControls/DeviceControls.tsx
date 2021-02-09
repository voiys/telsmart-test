import { ChangeEventHandler, FC } from 'react';
import { Form } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { Container, ControlsContainer, ControlsHeader } from '../../shared';
import DeviceAddForm from '../Forms/DeviceAddForm';

export interface DeviceControlsProps {}

const DeviceControls: FC<DeviceControlsProps> = () => {
  const { filterDevices } = useAppContext();

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    filterDevices(e.target.value);
  };

  return (
    <ControlsContainer>
      <ControlsHeader title='Devices' />
      <Container>
        <Form.Control
          onChange={handleSearchChange}
          placeholder='Search through customers'
        />
      </Container>
      <Container>
        <DeviceAddForm />
      </Container>
    </ControlsContainer>
  );
};

export default DeviceControls;
