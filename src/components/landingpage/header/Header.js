import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated, selectUserType } from 'src/store/auth/AuthSlice';
import {
  AppBar,
  styled,
  Toolbar,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';

import Logo from 'src/layouts/full/shared/logo/Logo';

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

const Header = () => {
  const theme = useTheme();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <ToolbarStyled disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            <Logo />
          </Box>
          <ButtonContainer>
            {!isMobile && (
              <>
                <StyledButton color="inherit" component={Link} to="/">
                  Home
                </StyledButton>
                <StyledButton color="inherit" component={Link} to="/about">
                  About
                </StyledButton>
                <StyledButton color="inherit" component={Link} to="/features">
                  Features
                </StyledButton>
              </>
            )}
            {isAuthenticated ? (
              <StyledButton
                color="primary"
                variant="contained"
                component={Link}
                to={userType === 'patient' ? '/dashboard/patient' : '/dashboard/doctor'}
              >
                Dashboard
              </StyledButton>
            ) : (
              <>
                <StyledButton color="primary" variant="outlined" component={Link} to="/auth/login">
                  Login
                </StyledButton>
                <StyledButton
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/auth/register"
                  sx={{ ml: isMobile ? 0 : 1 }}
                >
                  Register
                </StyledButton>
              </>
            )}
          </ButtonContainer>
        </ToolbarStyled>
      </Container>
    </AppBar>
  );
};

export default Header;
