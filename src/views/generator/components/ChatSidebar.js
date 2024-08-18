import React from 'react';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import ChatListing from './ChatListing';

const drawerWidth = 320;

const ChatSidebar = ({ isMobileSidebarOpen, onSidebarClose, onStartChat, isChatActive }) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Drawer
      open={lgUp ? true : isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          position: lgUp ? 'relative' : 'fixed',
          height: '100%',
        },
      }}
    >
      <ChatListing onStartChat={onStartChat} isChatActive={isChatActive} />
    </Drawer>
  );
};

export default ChatSidebar;
