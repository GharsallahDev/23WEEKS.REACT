import React from 'react';
import { Typography, Avatar, ListItemAvatar, Box } from '@mui/material';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import chatIcon from 'src/assets/images/chat/gpt.png';
import { keyframes } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-10.jpg';

const typingAnimation = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const ChatContent = ({ messages, isTyping, chatMode, user }) => {
  const { t } = useTranslation();

  const getAvatarSrc = (sender) => {
    if (sender === 'bot') return chatIcon;
    if (sender === 'doctor') return user?.pregnancy_info?.gynecologist?.avatar || img1;
    return img2; // Default for user
  };

  const getSenderName = (sender) => {
    if (sender === 'bot') return t('Dr Gyno');
    if (sender === 'doctor')
      return user?.pregnancy_info?.gynecologist?.full_name || t('Gynecologist');
    return t('You');
  };

  return (
    <Scrollbar style={{ flexGrow: 1 }}>
      <Box p={3}>
        {messages.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
              {chatMode === 'bot'
                ? t("Welcome! I'm Dr. Gyno, your virtual assistant. How can I help you today?")
                : t('Welcome! You can start chatting with your gynecologist here.')}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              {t('Type a message below to get started.')}
            </Typography>
          </Box>
        ) : (
          messages.map((message, index) => (
            <Box key={index} mb={2}>
              {message.sender !== 'user' ? (
                <Box display="flex">
                  <ListItemAvatar>
                    <Avatar
                      alt={getSenderName(message.sender)}
                      src={getAvatarSrc(message.sender)}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <Box>
                    <Typography variant="body2" color="grey.400" mb={1}>
                      {getSenderName(message.sender)}
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: 'grey.100',
                        borderRadius: '10px',
                        maxWidth: '80%',
                      }}
                    >
                      <Typography>{message.content}</Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: 'primary.light',
                      borderRadius: '10px',
                      maxWidth: '80%',
                    }}
                  >
                    <Typography>{message.content}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          ))
        )}
        {isTyping && (
          <Box display="flex" alignItems="center" mb={2}>
            <ListItemAvatar>
              <Avatar
                alt={getSenderName(chatMode)}
                src={getAvatarSrc(chatMode)}
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <Box
              sx={{
                width: 60,
                height: 30,
                backgroundColor: 'grey.100',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map((dot) => (
                <Box
                  key={dot}
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'grey.500',
                    mx: 0.5,
                    animation: `${typingAnimation} 1s infinite ${dot * 0.3}s`,
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Scrollbar>
  );
};

export default ChatContent;