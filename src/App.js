import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import AuthChecker from './components/AuthChecker';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <ScrollToTop>
            <AuthChecker>{routing}</AuthChecker>
          </ScrollToTop>
        </RTL>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
