import React from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import chatbotIcon from 'src/assets/images/chat/gpt.png';
import { useTranslation } from 'react-i18next';

const ChatListing = ({ onStartChat, isChatActive }) => {
    const { t } = useTranslation();
  return (
    <div>
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Avatar alt="Dr Gyno" src={chatbotIcon} sx={{ width: 50, height: 50 }} />
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {t('Dr Gyno')}
          </Typography>
          <Typography variant="body2">{t('Advanced Prenatal Care Agent')}</Typography>
        </Box>
      </Box>
      <Box px={3} py={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onStartChat}
          disabled={isChatActive}
        >
          {isChatActive ? t('Chat Active') : t('Start Chat')}
        </Button>
      </Box>
    </div>
  );
};

export default ChatListing;