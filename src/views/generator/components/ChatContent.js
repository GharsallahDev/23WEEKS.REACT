import React, { useEffect, useRef } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import chatIcon from 'src/assets/images/chat/gpt.png';
import { formatDistanceToNowStrict } from 'date-fns';
import { useTranslation } from 'react-i18next';
import user1 from 'src/assets/images/profile/user-1.jpg';
import { keyframes } from '@emotion/react';

const typingAnimation = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const ChatContent = ({ messages, isTyping, chatMode, user, gynecologist }) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const getAvatarSrc = (isBot) => {
    if (chatMode === 'bot') {
      return isBot ? chatIcon : user?.avatar || user1;
    } else {
      return isBot ? user?.pregnancy_info?.gynecologist?.avatar || user1 : user?.avatar || user1;
    }
  };

  const getSenderName = (isBot) => {
    if (chatMode === 'bot') {
      return isBot ? t('Dr Gyno') : t('You');
    } else {
      return isBot ? gynecologist?.full_name || t('Gynecologist') : t('You');
    }
  };

  const isMessageFromBot = (message) => {
    return message.is_bot === true || message.sender === 'bot' || message.sender === 'doctor';
  };

  return (
    <Scrollbar style={{ height: '100%', overflow: 'auto' }}>
      <Box sx={{ padding: 2 }}>
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const isBot = isMessageFromBot(message);
            return (
              <Box
                key={message.id || `message-${index}`}
                sx={{
                  display: 'flex',
                  justifyContent: isBot ? 'flex-start' : 'flex-end',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    backgroundColor: isBot ? 'grey.200' : 'primary.light',
                    borderRadius: 2,
                    padding: 1,
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                    {formatDistanceToNowStrict(new Date(message.timestamp), { addSuffix: true })}
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
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
        )}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              alt={getSenderName(true)}
              src={getAvatarSrc(true)}
              sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Box
              sx={{
                p: 1,
                backgroundColor: 'grey.200',
                borderRadius: 2,
                display: 'inline-flex',
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
        <div ref={messagesEndRef} />
      </Box>
    </Scrollbar>
  );
};

export default ChatContent;