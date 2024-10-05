import React, { useState } from 'react';
import { IconButton, InputBase, Box } from '@mui/material';
import { IconSend } from '@tabler/icons';

const ChatMsgSent = ({ onSendMessage }) => {
  const [msg, setMsg] = useState('');

  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (msg.trim()) {
      onSendMessage(msg);
      setMsg('');
    }
  };

  return (
    <Box p={2}>
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <InputBase
          fullWidth
          value={msg}
          placeholder="Type a Message"
          size="small"
          type="text"
          inputProps={{ 'aria-label': 'Type a Message' }}
          onChange={handleChatMsgChange}
        />
        <IconButton
          aria-label="send"
          onClick={onChatMsgSubmit}
          disabled={!msg.trim()}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;