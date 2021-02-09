import { Frame } from 'framer';
import { FC } from 'react';
import { Card } from 'react-bootstrap';

export interface DisplayErrorMessageProps {
  message: string;
}

const DisplayErrorMessage: FC<DisplayErrorMessageProps> = ({ message }) => {
  return (
    <Frame width='50%' height='100%' background='none'>
      <Card className='border-warning'>
        <Card.Body>
          <Card.Title as='h2'>{message}</Card.Title>
        </Card.Body>
      </Card>
    </Frame>
  );
};

export default DisplayErrorMessage;
