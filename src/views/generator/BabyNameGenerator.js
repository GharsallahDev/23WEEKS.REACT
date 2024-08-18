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
    options: ['Boy', 'Girl', "I don't know yet"],
  },
  {
    id: 2,
    text: "What's your preferred name origin?",
    options: ['African', 'Latin', 'Hebrew', 'Celtic', 'Nordic'],
  },
  {
    id: 3,
    text: 'Do you prefer traditional or modern names?',
    options: ['Traditional', 'Modern', 'A mix of both'],
  },
  {
    id: 4,
    text: 'How many syllables do you prefer?',
    options: ['One', 'Two', 'Three', 'No preference'],
  },
  {
    id: 5,
    text: 'What personality trait do you hope your child will have?',
    options: ['Creative', 'Intelligent', 'Kind', 'Brave', 'Curious'],
  },
  {
    id: 6,
    text: 'What element or aspect of nature inspires you?',
    options: ['Ocean', 'Mountains', 'Forest', 'Sky', 'Desert'],
  },
];

const BabyNameGenerator = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generating, setGenerating] = useState(false);
  const [names, setNames] = useState([]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGenerating(true);
      setTimeout(() => {
        const generatedNames = generateNames(answers);
        setNames(generatedNames);
        setGenerating(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setNames([]);
  };

  const generateNames = (answers) => {
    const genderSpecificNames = {
      Boy: ['Liam', 'Noah', 'Oliver', 'Elijah', 'William'],
      Girl: ['Olivia', 'Emma', 'Ava', 'Charlotte', 'Sophia'],
    };

    const originSpecificNames = {
      African: ['Zuri', 'Kwesi', 'Amara', 'Kobe', 'Nia'],
      Latin: ['Luna', 'Nova', 'Leo', 'Aria', 'Cruz'],
      Hebrew: ['Ezra', 'Abigail', 'Asher', 'Eliana', 'Levi'],
      Celtic: ['Finn', 'Niamh', 'Rowan', 'Saoirse', 'Declan'],
      Nordic: ['Freya', 'Bjorn', 'Astrid', 'Leif', 'Ingrid'],
    };

    let namePool = [];

    if (answers[0] !== "I don't know yet") {
      namePool = [...genderSpecificNames[answers[0]]];
    } else {
      namePool = [...genderSpecificNames.Boy, ...genderSpecificNames.Girl];
    }

    namePool = [...namePool, ...originSpecificNames[answers[1]]];

    return namePool.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  return (
    <PageContainer title="Baby Name Generator" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Baby Names Generator" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="150px" />
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
            {started && !generating && names.length === 0 && (
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
          </AnimatePresence>
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default BabyNameGenerator;
