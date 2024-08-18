import React, { useState, useEffect } from 'react';
import { Divider, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';
import ChatMsgSent from './components/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';
import breadcrumbImg from 'src/assets/images/breadcrumb/chat.png';
import config from 'src/config';

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
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
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
        content: "Hello! I'm Dr. Gyno, your prenatal care expert. How can I assist you today?",
      },
    ]);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const handleSendMessage = async (message) => {
    if (!isChatActive) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: message }]);
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
            content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'bot',
          content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <PageContainer title="Chat Bot" description="Dr. Gyno Chat Bot">
      <Breadcrumb title="Chat Bot" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="150px" />
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
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
                sx={{
                  padding: 0,
                  margin: 0,
                  width: '100%',
                  height: '40px', // Set a fixed height
                  '& .MuiSvgIcon-root': {
                    fontSize: '24px', // Adjust icon size if needed
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
            <Box sx={{ flexShrink: 0 }}>
              <ChatMsgSent onSendMessage={handleSendMessage} isChatActive={isChatActive} />
            </Box>
          </Box>
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Bot;