import { FC } from 'react';
import { Stack, StackSpecificProps } from 'framer';

export interface ContainerProps extends Partial<StackSpecificProps> {}

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Stack
      {...props}
      width='100%'
      height='fit-content'
      padding={props?.padding ?? 20}
    >
      {children}
    </Stack>
  );
};

export default Container;
