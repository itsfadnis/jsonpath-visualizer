import React from 'react';
import { render } from 'react-dom';
import JSONView from './JSONView';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './Navbar';
import { CssBaseline, Container } from '@material-ui/core';
import JSONInput from './JSONInput';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        <JSONInput />
        <JSONView />
      </Container>
    </>
  );
};

const AppWithStore: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<AppWithStore />, document.getElementById('app'));
