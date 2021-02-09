import { Stack, StackProperties } from 'framer';
import { FC } from 'react';

const DisplayContainer: FC<Partial<StackProperties>> = ({
  children,
  ...props
}) => {
  return (
    <Stack
      {...props}
      className='border'
      borderRadius={10}
      width='66.5%'
      height='100%'
      padding={20}
    >
      {children}
    </Stack>
  );
};

export default DisplayContainer;
