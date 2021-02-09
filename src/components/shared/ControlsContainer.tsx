import { Stack } from 'framer';
import { FC } from 'react';

export interface ControlsContainerProps {}

const ControlsContainer: FC<ControlsContainerProps> = ({ children }) => {
  return (
    <Stack
      className='border'
      borderRadius={10}
      distribution='start'
      width='33.5%'
      height='100%'
      gap={20}
      padding={20}
    >
      {children}
    </Stack>
  );
};

export default ControlsContainer;
