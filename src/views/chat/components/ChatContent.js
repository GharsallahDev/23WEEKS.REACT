import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';

const ChatContent = ({ messages, isTyping, user }) => {
  console.log('ChatContent render. Messages:', messages);

  return (
    <Box sx={{ height: '100%', overflow: 'auto', padding: 2 }}>
      {messages.length > 0 ? (
        messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'doctor' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                backgroundColor: message.sender === 'doctor' ? 'primary.light' : 'grey.200',
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
        ))
      ) : (
        <Typography>No messages yet.</Typography>
      )}
    </Box>
  );
};

export default ChatContent;