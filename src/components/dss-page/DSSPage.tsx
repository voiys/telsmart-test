import { FC } from 'react';
import { MainContainer } from '../shared';
import { DSSControls, DSSDisplay } from './';

export interface DSSPageProps {}

const DSSPage: FC<DSSPageProps> = () => {
  return (
    <MainContainer>
      <DSSControls />
      <DSSDisplay />
    </MainContainer>
  );
};

export default DSSPage;
