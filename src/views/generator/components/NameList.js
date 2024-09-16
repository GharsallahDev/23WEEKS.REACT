import React from 'react';
import { Box, Typography } from '@mui/material';

const NameList = ({ names }) => {
  return (
    <Box>
      {names.map((nameObj) => (
        <Box key={nameObj.Name} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            {nameObj.Name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default NameList;