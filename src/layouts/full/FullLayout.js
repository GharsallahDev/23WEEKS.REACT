import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './vertical/header/Header';
import HorizontalHeader from '../full/horizontal/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from './horizontal/navbar/Navbar';
import { selectIsAuthenticated } from '../../store/auth/AuthSlice';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const customizer = useSelector((state) => state.customizer);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const theme = useTheme();

  const isHomePage = location.pathname === '/';

  return (
    <MainWrapper
      className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}
    >
      {/* Sidebar */}
      {isAuthenticated && !customizer.isHorizontal && <Sidebar />}

      {/* Main Wrapper */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(isAuthenticated &&
            customizer.isCollapse && {
              [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
            }),
        }}
      >
        {/* Header */}
        {isAuthenticated && (customizer.isHorizontal ? <HorizontalHeader /> : <Header />)}

        {/* Navigation */}
        {isAuthenticated && customizer.isHorizontal && <Navigation />}

        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          {/* Page Route */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
        </Container>

        {/* Customizer */}
        {isAuthenticated && <Customizer />}
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
