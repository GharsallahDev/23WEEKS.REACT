import React from 'react';
import { Box, Button, Typography, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const NameList = ({ names, expandedName, toggleNameDetails }) => {
  return (
    <Box>
      {names.map((nameObj) => (
        <Box key={nameObj.Name} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {nameObj.Name}
          </Typography>
          <Button 
            onClick={() => toggleNameDetails(nameObj.Name)}
            endIcon={expandedName === nameObj.Name ? <ExpandLess /> : <ExpandMore />}
            sx={{ marginLeft: 2 }} // Adjust this value to control the space
          >
            {expandedName === nameObj.Name ? '' : ''}
          </Button>
          <Collapse in={expandedName === nameObj.Name} sx={{ width: '100%', marginTop: 2 }}>
            <Box sx={{ paddingLeft: 3 }}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', marginBottom: 1 }}>
                <strong>Gender:</strong> {nameObj.Gender}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', marginBottom: 1 }}>
                <strong>Origin:</strong> {nameObj.Origin}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', marginBottom: 1 }}>
                <strong>Meaning:</strong> {nameObj.Meaning}
              </Typography>
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default NameList;
