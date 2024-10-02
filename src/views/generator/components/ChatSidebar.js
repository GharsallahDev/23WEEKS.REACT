import React from 'react';
import {
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const drawerWidth = 320;

const ChatSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  onStartChat,
  onEndChat,
  isChatActive,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  chatMode,
  setChatMode,
}) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation();

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
      <Box sx={{ p: 3 }}>
        {!isChatActive ? (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{t('Chat Mode')}</InputLabel>
              <Select
                value={chatMode}
                onChange={(e) => setChatMode(e.target.value)}
                label={t('Chat Mode')}
              >
                <MenuItem value="bot">{t('Dr. Gyno (Chatbot)')}</MenuItem>
                <MenuItem value="doctor">{t('Real Doctor')}</MenuItem>
              </Select>
            </FormControl>

            {chatMode === 'doctor' && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t('Select Doctor')}</InputLabel>
                <Select
                  value={selectedDoctor ? selectedDoctor.id : ''}
                  onChange={(e) => setSelectedDoctor(doctors.find((d) => d.id === e.target.value))}
                  label={t('Select Doctor')}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={onStartChat}
              disabled={chatMode === 'doctor' && !selectedDoctor}
            >
              {t('Start Chat')}
            </Button>
          </>
        ) : (
          <Button fullWidth variant="contained" onClick={onEndChat}>
            {t('End Chat')}
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default ChatSidebar;