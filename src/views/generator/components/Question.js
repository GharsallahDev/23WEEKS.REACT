import React, { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledBox = styled(Box)(({ theme }) => ({
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Question = ({ question, onAnswer }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = () => {
    if (question.validate) {
      const validationResult = question.validate(inputValue);
      if (validationResult === true) {
        onAnswer(inputValue);
      } else {
        setError(validationResult);
      }
    } else {
      onAnswer(inputValue);
    }
  };

  return (
    <StyledBox>
      <Typography variant="h6">{question.text}</Typography>
      {question.inputType === 'text' ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TextField
              label="Enter a letter"
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={handleInputChange}
              error={Boolean(error)}
              helperText={error}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
              Submit
            </StyledButton>
          </motion.div>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StyledButton variant="outlined" fullWidth onClick={() => onAnswer(option)}>
                {option}
              </StyledButton>
            </motion.div>
          ))}
        </Box>
      )}
    </StyledBox>
  );
};

export default Question;