import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Question from './components/Question';
import ProgressBar from './components/ProgressBar';
import LoadingAnimation from './components/LoadingAnimation';
import NameList from './components/NameList';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/baby.png';
import config from 'src/config';

const BCrumb = [
  {
    to: '/',
    title: 'Generator',
  },
  {
    title: 'Baby Names',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 600,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const questions = [
  {
    id: 1,
    text: 'Are you expecting a boy or a girl?',
    options: ['Boy', 'Girl'],
  },
  {
    id: 2,
    text: "What's your preferred name origin?",
    options: ['Arabic', 'Swahili', 'Yoruba', 'Zulu', 'Amharic', 'Igbo'],
  },
  {
    id: 3,
    text: 'What is the meaning you want the name to reflect?',
    options: ['Brave', 'Love', 'Peace', 'Strength', 'Wisdom'],
  },
  {
    id: 4,
    text: 'How long should the name be?',
    options: ['Short (1-4 letters)', 'Medium (5-7 letters)', 'Long (8+ letters)'],
  },
  {
    id: 5,
    text: 'Which letter should the name start with?',
    inputType: 'text',
    placeholder: 'Enter a letter',
    validate: (input) => /^[A-Za-z]$/.test(input) ? true : 'Please enter a single letter',
  },
];

const BabyNameGenerator = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generating, setGenerating] = useState(false);
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = async (answer) => {
    const updatedAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
    } else {
        setGenerating(true);
        try {
            const response = await fetch(`${config.apiUrl}/api/generate_name`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gender: updatedAnswers[0],          
                    origin: updatedAnswers[1],         
                    meaning: updatedAnswers[2],       
                    name_length: updatedAnswers[3],      
                    start_letter: updatedAnswers[4],     
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to generate names: ${errorText}`);
            }

            const data = await response.json();
            setNames(data.baby_names);  // Handle the list of names
        } catch (error) {
            setError(`An error occurred: ${error.message}`);
            console.error('Error:', error);
        } finally {
            setGenerating(false);
        }
    }
};

 

  const handleReset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setNames([]);
    setError(null);
  };

  return (
    <PageContainer title="Baby Name Generator" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Baby Names Generator" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Breadcrumb" width="150px" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h5" align="center">
            AI Baby Name Generator
          </StyledTypography>
          <AnimatePresence mode="wait">
            {!started && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleStart}
                >
                  Start Name Generator
                </Button>
              </motion.div>
            )}
            {started && !generating && names.length === 0 && !error && (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <StyledBox>
                  <Question question={questions[currentQuestion]} onAnswer={handleAnswer} />
                  <ProgressBar current={currentQuestion + 1} total={questions.length} />
                </StyledBox>
              </motion.div>
            )}
            {generating && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingAnimation />
              </motion.div>
            )}
            {names.length > 0 && (
              <motion.div
                key="names"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <StyledBox>
                  <NameList names={names} />
                  <Button variant="outlined" color="primary" fullWidth onClick={handleReset}>
                    Start Over
                  </Button>
                </StyledBox>
              </motion.div>
            )}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Typography color="error" align="center">
                  {error}
                </Typography>
                <Button variant="outlined" color="primary" fullWidth onClick={handleReset}>
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default BabyNameGenerator;