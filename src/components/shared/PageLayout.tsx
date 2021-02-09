import { Page } from 'framer';
import { FC } from 'react';
import { useAppContext } from '../../context';
import { DevicePage } from '../device-page';
import { DSSPage } from '../dss-page';

const PageLayout: FC = () => {
  const { displayedPage } = useAppContext();

  const currentPage = displayedPage === 'device' ? 0 : 1;
  return (
    <Page
      width='100%'
      height='100%'
      direction='vertical'
      defaultEffect='cube'
      padding={20}
      dragEnabled={false}
      currentPage={currentPage}
    >
      <DevicePage />
      <DSSPage />
    </Page>
  );
};

export default PageLayout;
