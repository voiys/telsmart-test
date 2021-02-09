import './theme.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageLayout } from './components/shared';
import { AppContextProvider } from './context';

const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <PageLayout />
      </AppContextProvider>
    </Router>
  );
};

export default App;
