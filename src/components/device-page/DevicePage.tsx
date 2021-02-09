import { FC } from 'react';
import { MainContainer } from '../shared';
import { DeviceControls, DeviceDisplay } from './';

const DevicePage: FC = () => {
  return (
    <MainContainer>
      <DeviceControls />
      <DeviceDisplay />
    </MainContainer>
  );
};

export default DevicePage;
