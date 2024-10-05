import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Avatar, Typography, Divider } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ChatContent from './components/ChatContent';
import ChatListing from './components/ChatListing';
import AppCard from 'src/components/shared/AppCard';
import breadcrumbImg from 'src/assets/images/breadcrumb/chat.png';
import defaultAvatar from 'src/assets/images/profile/user-10.jpg';
import config from 'src/config';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Chat',
  },
];

const GynecologistChat = () => {
  const { t } = useTranslation();
  const [conversations, setConversations] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const getAvatarSrc = (avatarUrl) => {
    return avatarUrl || defaultAvatar;
  };

  useEffect(() => {
    if (user && user.id) {
      fetchGynecologistConversations();
    }
  }, [user]);

  const fetchGynecologistConversations = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/api/gynecologist/conversations?gynecologist_id=${user.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched conversations:', data);
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error fetching gynecologist conversations:', error);
    }
  };

  const fetchChatHistory = async (patientId) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/api/gynecologist/chat/history?patient_id=${patientId}&gynecologist_id=${user.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched chat history:', data);
        const formattedMessages = data.messages.map((msg) => ({
          id: msg.id,
          sender: msg.is_from_patient ? 'patient' : 'doctor',
          content: msg.content,
          timestamp: msg.timestamp,
          read: msg.read,
        }));
        console.log('Formatted messages:', formattedMessages);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handlePatientSelect = (patient) => {
    console.log('Selected patient:', patient);
    setSelectedPatient(patient);
    fetchChatHistory(patient.patient_id);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedPatient) return;

    const newMessage = {
      sender: 'doctor',
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(`${config.apiUrl}/api/gynecologist/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_id: selectedPatient.patient_id,
          gynecologist_id: user.id,
          message: message,
          is_from_doctor: true,
        }),
      });

      if (!response.ok) {
        console.error('Error sending message to patient');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  console.log('Render - Selected patient:', selectedPatient);
  console.log('Render - Messages:', messages);

  return (
    <PageContainer title={t('Chat')} description={t('Chat with Patients')}>
      <Breadcrumb title={t('Chat')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt={t('Chat')} width="150px" />
        </Box>
      </Breadcrumb>
      <AppCard>
        <Box sx={{ display: 'flex', height: '650px', width: '100%' }}>
          <Box
            sx={{ width: '30%', borderRight: '1px solid rgba(0, 0, 0, 0.12)', overflow: 'auto' }}
          >
            <ChatListing
              conversations={conversations}
              onPatientSelect={handlePatientSelect}
              selectedPatient={selectedPatient}
              doctorName={user.full_name}
            />
          </Box>
          <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
            {selectedPatient ? (
              <>
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={getAvatarSrc(selectedPatient.avatar)}
                      alt={selectedPatient.patient_name}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {selectedPatient.patient_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Current Pregnancy Week : {selectedPatient.pregnancy_week}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <ChatContent messages={messages} isTyping={isTyping} user={user} />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
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
                        <IconButton onClick={handleSendMessage} disabled={!message.trim()}>
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                {console.log("Rendering 'Select a patient' message")}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="h5">{t('Select a patient to start chatting')}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default GynecologistChat;
