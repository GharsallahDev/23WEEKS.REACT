import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Badge,
} from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';
import defaultAvatar from 'src/assets/images/profile/user-10.jpg';
import { useSelector } from 'react-redux';

const ChatListing = ({ conversations, onPatientSelect, selectedPatient, doctorName }) => {
  const user = useSelector((state) => state.auth.user);

  const getAvatarSrc = (avatarUrl) => {
    return avatarUrl || defaultAvatar;
  };

  return (
    <>
      <Box
        display={'flex'}
        alignItems="center"
        gap="10px"
        p={3}
        sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          overlap="circular"
          color="success"
        >
          <Avatar
            alt={user.full_name}
            src={getAvatarSrc(user.avatar)}
            sx={{ width: 54, height: 54 }}
          />
        </Badge>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {user.full_name}
          </Typography>
          <Typography variant="body2">Gynecologist</Typography>
        </Box>
      </Box>
      <List>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.patient_id}
            button
            onClick={() => onPatientSelect(conversation)}
            selected={selectedPatient && selectedPatient.patient_id === conversation.patient_id}
          >
            <ListItemAvatar>
              <Avatar alt={conversation.patient_name} src={getAvatarSrc(conversation.avatar)} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {conversation.patient_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNowStrict(new Date(conversation.last_message_time), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {conversation.last_message.is_from_patient ? '' : 'You: '}
                  {conversation.last_message.content}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChatListing;