import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-10.jpg';
import { IconPower } from '@tabler/icons';
import { logout } from 'src/store/auth/AuthSlice';

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  const avatarSrc = user?.avatar
    ? user.avatar
    : user?.type === 'doctor'
    ? img1 
    : img2;

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: 'secondary.light' }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="User Image" src={avatarSrc} />

          <Box>
            <Typography variant="h6" color="textPrimary">
              {user ? user.full_name : 'Full Name'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : 'Type'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" onClick={handleLogout} aria-label="logout" size="small">
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : null}
    </Box>
  );
};
