import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GlobalTheme } from 'remember-ui';

import Parser from 'pages/Parser/Parser';
import { ConfirmModalProvider } from 'context/ConfirmModalContext';
import GlobalConfirmModal from 'components/GlobalConfirmModal/GlobalConfirmModal';
import GlobalHelmet from 'components/GlobalHelmet/GlobalHelmet';
import Routes from 'routers/routes';
import CommonRoute from 'routers/CommonRoute';
// import Home from 'pages/Home/Home';

import { AppBody } from './App.styles';

function App() {
  const { root, parser } = Routes;

  return (
    <ConfirmModalProvider>
      <GlobalHelmet />
      <BrowserRouter>
        <AppBody>
          <GlobalTheme />
          <Switch>
            <CommonRoute path={parser.path}>
              <Parser />
            </CommonRoute>
            {/* <CommonRoute path={root.path}>
              <Home />
            </CommonRoute> */}
            <Redirect to={parser.path} />
          </Switch>
        </AppBody>
        <GlobalConfirmModal />
      </BrowserRouter>
    </ConfirmModalProvider>
  );
}

export default App;
