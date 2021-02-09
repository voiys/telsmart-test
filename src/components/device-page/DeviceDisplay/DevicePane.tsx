import { Stack } from 'framer';
import { FC } from 'react';
import { MappedDevices } from '../../../types';
import Device from './Device';

export interface DevicePaneProps {
  devices: MappedDevices;
  devicesPerPage: number;
}

const DevicePane: FC<DevicePaneProps> = ({ devices, devicesPerPage }) => {
  const devicesPerStack = devicesPerPage / 2;
  const stack1 = devices.slice(0, devicesPerStack);
  const stack2 = devices.slice(devicesPerStack);

  return (
    <Stack width='100%' height='100%'>
      <Stack
        width='1fr'
        height='1fr'
        gap={20}
        distribution='space-evenly'
        direction='horizontal'
      >
        {stack1.map(device => (
          <Device key={device.id} device={device} />
        ))}
      </Stack>
      <Stack
        width='1fr'
        height='1fr'
        gap={20}
        distribution='space-evenly'
        direction='horizontal'
      >
        {stack2.map(device => (
          <Device key={device.id} device={device} />
        ))}
      </Stack>
    </Stack>
  );
};

export default DevicePane;
