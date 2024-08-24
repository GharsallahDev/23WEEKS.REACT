import React, { useState, useEffect, useRef } from 'react';
import { Divider, Box, IconButton, useMediaQuery, useTheme, TextField } from '@mui/material';
import { Menu as MenuIcon, Send as SendIcon, Mic as MicIcon } from '@mui/icons-material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';
import AppCard from 'src/components/shared/AppCard';
import breadcrumbImg from 'src/assets/images/breadcrumb/chat.png';
import config from 'src/config';
import { useTranslation } from 'react-i18next';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Chat Bot',
  },
];

const Bot = () => {
  const { t } = useTranslation();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [message, setMessage] = useState('');
  const recognitionRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    const chatContent = document.getElementById('chat-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, [messages]);

  const handleStartChat = () => {
    setIsChatActive(true);
    setMessages([
      {
        sender: 'bot',
        content: t("Hello! I'm Dr. Gyno, your prenatal care expert. How can I assist you today?"),
      },
    ]);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!isChatActive || !message.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: message }]);
    setMessage('');
    setIsBotTyping(true);

    try {
      const response = await fetch(`${config.apiUrl}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', content: data.content }]);
      } else {
        console.error('Error from chatbot API');
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'bot',
            content: t(
              "I'm sorry, I'm having trouble responding right now. Please try again later.",
            ),
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'bot',
          content: t("I'm sorry, I'm having trouble responding right now. Please try again later."),
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
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

  return (
    <PageContainer title={t('Chat Bot')} description={t('Dr. Gyno Chat Bot')}>
      <Breadcrumb title={t('Chat Bot')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt={t('Chat Bot')} width="150px" />
        </Box>
      </Breadcrumb>
      <AppCard>
        <Box sx={{ display: 'flex', height: '650px', width: '100%' }}>
          {isMobile && (
            <Box
              sx={{
                width: '50px',
                borderRight: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '8px 0',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <IconButton
                color="inherit"
                aria-label={t('Open drawer')}
                edge="start"
                onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
                sx={{
                  padding: 0,
                  margin: 0,
                  width: '100%',
                  height: '40px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '24px',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          <ChatSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
            onStartChat={handleStartChat}
            isChatActive={isChatActive}
          />
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            sx={{ height: '100%', overflow: 'hidden' }}
          >
            <ChatContent
              toggleChatSidebar={() => setMobileSidebarOpen(true)}
              messages={messages}
              isChatActive={isChatActive}
              isBotTyping={isBotTyping}
            />
            <Divider />
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '8px' }}>
              <TextField
                fullWidth
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type or speak your message..."
                disabled={!isChatActive}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSpeechInput}
                aria-label="Start speech input"
                disabled={!isChatActive}
              >
                <MicIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                aria-label="Send message"
                disabled={!isChatActive || !message.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Bot;
