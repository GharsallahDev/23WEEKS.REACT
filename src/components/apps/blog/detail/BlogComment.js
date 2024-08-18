import React, { useState } from 'react';
import { Stack, Avatar, Box, Typography, Tooltip, Fab, TextField, Button } from '@mui/material';
import { IconArrowBackUp, IconCircle } from '@tabler/icons';

const BlogComment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);

  if (!comment) {
    return null;
  }

  const { profile, replies } = comment;

  return (
    <>
      <Box mt={2} p={3} sx={{ backgroundColor: 'grey.100' }}>
        <Stack direction={'row'} gap={2} alignItems="center">
          <Avatar
            alt={profile?.name || 'Anonymous'}
            src={profile?.avatar}
            sx={{ width: '33px', height: '33px' }}
          >
            {profile?.name ? profile.name[0] : 'A'}
          </Avatar>
          <Typography variant="h6">{profile?.name || 'Anonymous'}</Typography>
          <Typography variant="caption" color="textSecondary">
            <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
            {profile?.time || 'Unknown time'}
          </Typography>
        </Stack>
        <Box py={2}>
          <Typography color="textSecondary">{comment.comment || 'No comment text'}</Typography>
        </Box>
        <Stack direction="row" gap={1} alignItems="center">
          <Tooltip title="Reply" placement="top">
            <Fab size="small" color="info" onClick={() => setShowReply(!showReply)}>
              <IconArrowBackUp size="16" />
            </Fab>
          </Tooltip>
        </Stack>
      </Box>
      {replies && replies.length > 0 && (
        <>
          {replies.map((reply, index) => (
            <Box pl={4} key={index}>
              <Box mt={2} p={3} sx={{ backgroundColor: 'grey.100' }}>
                <Stack direction={'row'} gap={2} alignItems="center">
                  <Avatar alt={reply.profile?.name || 'Anonymous'} src={reply.profile?.avatar}>
                    {reply.profile?.name ? reply.profile.name[0] : 'A'}
                  </Avatar>
                  <Typography variant="h6">{reply.profile?.name || 'Anonymous'}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
                    {reply.profile?.time || 'Unknown time'}
                  </Typography>
                </Stack>
                <Box py={2}>
                  <Typography color="textSecondary">{reply.comment || 'No reply text'}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </>
      )}
      {showReply && (
        <Box p={2}>
          <Stack direction={'row'} gap={2} alignItems="center">
            <Avatar
              alt={profile?.name || 'Anonymous'}
              src={profile?.avatar}
              sx={{ width: '33px', height: '33px' }}
            >
              {profile?.name ? profile.name[0] : 'A'}
            </Avatar>
            <TextField placeholder="Reply" variant="outlined" fullWidth />
            <Button variant="contained">Reply</Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default BlogComment;