import { Frame, Page, Stack } from 'framer';
import { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { Pagination as IPagination } from '../../../types';
import { DisplayContainer } from '../../shared';
import DevicePane from './DevicePane';
import Pagination from './Pagination';

export interface DeviceDisplayProps {}

const DeviceDisplay: FC<DeviceDisplayProps> = () => {
  const { activePagination, displayedDevices, searchValue } = useAppContext();
  const devicesPerPage = 4;
  const lastPage = Math.floor(displayedDevices.length / devicesPerPage);

  const getDeviceGroups = () => {
    const deviceGroups = [];
    for (let i = 0; i < lastPage; i++) {
      const cursor = i * devicesPerPage;
      const devices = displayedDevices.slice(cursor, cursor + devicesPerPage);
      deviceGroups.push(devices);
    }
    return deviceGroups;
  };

  const getPagination = () => {
    const pagination: IPagination = [];

    if (lastPage < 5) {
      for (let i = 0; i < lastPage; i++) {
        pagination.push(i);
      }
    } else if (activePagination < 3) {
      for (let i = 0; i < 5; i++) {
        pagination.push(i);
      }
      pagination.push('last');
    } else if (activePagination > lastPage - 4) {
      pagination.push('first');
      for (let i = lastPage - 5; i < lastPage; i++) {
        pagination.push(i);
      }
    } else {
      pagination.push(
        'first',
        activePagination - 2,
        activePagination - 1,
        activePagination,
        activePagination + 1,
        activePagination + 2,
        'last'
      );
    }
    return pagination;
  };

  const pagination = getPagination();

  const renderDevicePanes = () => {
    if (displayedDevices.length > 0 && searchValue.length >= 0) {
      return (
        <Page
          width='100%'
          height='100%'
          defaultEffect='wheel'
          gap={20}
          currentPage={activePagination}
          dragEnabled={false}
        >
          {getDeviceGroups().map((devices, i) => (
            <DevicePane
              key={i}
              devices={devices}
              devicesPerPage={devicesPerPage}
            />
          ))}
        </Page>
      );
    } else if (displayedDevices.length === 0 && searchValue.length > 0) {
      return (
        <Stack width='100%' height='100%' center>
          {' '}
          <Frame>whateber</Frame>{' '}
        </Stack>
      );
    } else {
      return (
        <Stack width='100%' height='100%' center>
          <Spinner animation='border' />
        </Stack>
      );
    }
  };

  return (
    <>
      <DisplayContainer>
        <Stack width='1fr' height='1fr' gap={20}>
          <Stack width='1fr' height='7fr'>
            {renderDevicePanes()}
          </Stack>
          <Pagination pagination={pagination} lastPage={lastPage} />
        </Stack>
      </DisplayContainer>
    </>
  );
};

export default DeviceDisplay;
