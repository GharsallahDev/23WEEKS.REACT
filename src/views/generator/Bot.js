import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, useTheme, TextField, Tabs, Tab, Avatar, Typography } from '@mui/material';
import { Send as SendIcon, Mic as MicIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ChatContent from './components/ChatContent';
import AppCard from 'src/components/shared/AppCard';
import breadcrumbImg from 'src/assets/images/breadcrumb/chat.png';
import config from 'src/config';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import chatIcon from 'src/assets/images/chat/gpt.png';
import user1 from 'src/assets/images/profile/user-1.jpg';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Chat',
  },
];

const Bot = () => {
  const { t } = useTranslation();
  const [botMessages, setBotMessages] = useState([]);
  const [doctorMessages, setDoctorMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isDoctorTyping, setIsDoctorTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMode, setChatMode] = useState('bot');
  const recognitionRef = useRef(null);
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.id) {
      fetchBotChatHistory();
      fetchGynecologistChatHistory();
    }
  }, [user]);

  const fetchBotChatHistory = async () => {
    if (!user || !user.id) {
      console.error('User ID is not available');
      return;
    }
    try {
      console.log('Fetching bot chat history for user ID:', user.id);
      const response = await fetch(`${config.apiUrl}/api/chatbot/history?user_id=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setBotMessages(data.history);
      }
    } catch (error) {
      console.error('Error fetching bot chat history:', error);
    }
  };

  const fetchGynecologistChatHistory = async () => {
    if (!user || !user.id) {
      console.error('User ID is not available');
      return;
    }
    try {
      console.log('Fetching gynecologist chat history for user ID:', user.id);
      const response = await fetch(
        `${config.apiUrl}/api/patient/chat/history?patient_id=${user.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setDoctorMessages(
          data.messages.map((msg) => ({
            sender: msg.is_from_patient ? 'user' : 'doctor',
            content: msg.content,
            timestamp: msg.timestamp,
            id: msg.id,
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching gynecologist chat history:', error);
    }
  };

  useEffect(() => {
    const chatContent = document.getElementById('chat-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, [botMessages, doctorMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !user || !user.id) return;

    const setMessages = chatMode === 'bot' ? setBotMessages : setDoctorMessages;
    const setTyping = chatMode === 'bot' ? setIsBotTyping : setIsDoctorTyping;

    const newMessage = { sender: 'user', content: message, timestamp: new Date().toISOString() };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');

    if (chatMode === 'bot') {
      setTyping(true);
    }

    try {
      const endpoint = chatMode === 'bot' ? 'chatbot' : 'gynecologist/chat';
      const body =
        chatMode === 'bot'
          ? { message, user_id: user.id }
          : {
              patient_id: user.id,
              gynecologist_id: user.pregnancy_info.gynecologist.id,
              message,
              is_from_patient: true,
            };

      const response = await fetch(`${config.apiUrl}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok && chatMode === 'bot') {
        const data = await response.json();
        const responseMessage = {
          sender: 'bot',
          content: data.content,
          timestamp: data.timestamp || new Date().toISOString(),
          id: data.id,
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      } else if (!response.ok) {
        console.error(`Error from ${chatMode} API`);
        if (chatMode === 'bot') {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: 'bot',
              content: t(
                "I'm sorry, I'm having trouble responding right now. Please try again later.",
              ),
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error(`Error sending message to ${chatMode}:`, error);
      if (chatMode === 'bot') {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'bot',
            content: t(
              "I'm sorry, I'm having trouble responding right now. Please try again later.",
            ),
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } finally {
      if (chatMode === 'bot') {
        setTyping(false);
      }
    }
  };

  const handleResetBotChat = async () => {
    if (!user || !user.id) return;

    try {
      await fetch(`${config.apiUrl}/api/chatbot/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id }),
      });
      setBotMessages([]);
    } catch (error) {
      console.error('Error resetting bot chat:', error);
    }
  };

  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setMessage(speechToText);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event);
    };
  };

  const handleSpeechInput = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    recognitionRef.current.start();
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <PageContainer title={t('Chat')} description={t('Chat with Dr. Gyno or your Gynecologist')}>
      <Breadcrumb title={t('Chat')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt={t('Chat')} width="150px" />
        </Box>
      </Breadcrumb>
      <AppCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '650px', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar
              src={
                chatMode === 'bot' ? chatIcon : user?.pregnancy_info?.gynecologist?.avatar || user1
              }
              alt={chatMode === 'bot' ? 'Dr Gyno' : 'Gynecologist'}
              sx={{ width: 80, height: 80, mr: 2, mt: 2 }}
            />
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={chatMode}
              onChange={(_, newValue) => setChatMode(newValue)}
              aria-label="chat mode tabs"
              sx={{
                '& .MuiTabs-flexContainer': {
                  justifyContent: 'center',
                },
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  textTransform: 'none',
                  minWidth: 200,
                  padding: '12px 24px',
                  borderRadius: '8px 8px 0 0',
                  margin: '0 4px',
                  transition: 'all 0.3s ease',
                },
              }}
              TabIndicatorProps={{
                style: {
                  display: 'none',
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Dr Gyno
                    </Typography>
                    <Typography variant="body2">{t('Bot')}</Typography>
                  </Box>
                }
                value="bot"
                sx={{
                  backgroundColor: chatMode === 'bot' ? 'primary.main' : 'transparent',
                  color: chatMode === 'bot' ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: chatMode === 'bot' ? 'primary.dark' : 'action.hover',
                  },
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user?.pregnancy_info?.gynecologist
                        ? capitalizeWords(user.pregnancy_info.gynecologist.full_name)
                        : t('Not Assigned')}
                    </Typography>
                    <Typography variant="body2">{t('Gynecologist')}</Typography>
                  </Box>
                }
                value="doctor"
                disabled={!user?.pregnancy_info?.gynecologist}
                sx={{
                  backgroundColor: chatMode === 'doctor' ? 'primary.main' : 'transparent',
                  color: chatMode === 'doctor' ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: chatMode === 'doctor' ? 'primary.dark' : 'action.hover',
                  },
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                }}
              />
            </Tabs>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              mt: 2,
            }}
          >
            <ChatContent
              messages={chatMode === 'bot' ? botMessages : doctorMessages}
              isTyping={chatMode === 'bot' ? isBotTyping : isDoctorTyping}
              chatMode={chatMode}
              user={user}
              gynecologist={user?.pregnancy_info?.gynecologist}
            />
          </Box>
          <Box sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
            <TextField
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('Type your message...')}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton onClick={handleSpeechInput}>
                      <MicIcon />
                    </IconButton>
                    <IconButton onClick={handleSendMessage} disabled={!message.trim()}>
                      <SendIcon />
                    </IconButton>
                    {chatMode === 'bot' && (
                      <IconButton onClick={handleResetBotChat}>
                        <RefreshIcon />
                      </IconButton>
                    )}
                  </>
                ),
              }}
            />
          </Box>
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Bot;