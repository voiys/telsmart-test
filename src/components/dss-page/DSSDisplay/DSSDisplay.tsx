import { Scroll, Stack } from 'framer';
import { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAppContext } from '../../../context';
import { DisplayContainer } from '../../shared';
import DSS from './DSS';

export interface DSSDisplayProps {}

const DSSDisplay: FC<DSSDisplayProps> = () => {
  const { displayedDSSs, reorderDSSs } = useAppContext();

  const reorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(displayedDSSs);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    reorderDSSs(result);
  };

  return (
    <DisplayContainer>
      (
      <Scroll width='45%' height='100%' dragEnabled={false} background='none'>
        {displayedDSSs.length > 0 &&
          displayedDSSs.map((dss, i) => (
            <DSS key={i} index={i} reorder={reorder} dss={dss} />
          ))}
      </Scroll>
      )
    </DisplayContainer>
  );
};

export default DSSDisplay;
