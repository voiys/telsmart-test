import { FC } from 'react';
import { Container } from '.';

export interface ControlsHeaderProps {
  title: string;
}

const ControlsHeader: FC<ControlsHeaderProps> = ({ title }) => {
  return (
    <Container alignment='start'>
      <h1 className='mb-0'>{title}</h1>
    </Container>
  );
};

export default ControlsHeader;
