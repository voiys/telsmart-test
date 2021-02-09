import { Stack } from 'framer';
import { FC } from 'react';

const MainContainer: FC = ({ children }) => {
  return (
    <Stack direction='horizontal' width='100%' height='100%'>
      {children}
    </Stack>
  );
};

export default MainContainer;
