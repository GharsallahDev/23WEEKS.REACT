import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import NameList from './components/NameList';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/baby.png';
import config from 'src/config';
import { useTranslation } from 'react-i18next';

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
  '& > *:not(:last-child)': {
    marginBottom: theme.spacing(4), // Adding space between fields
  },
}));

const originOptions = [
  "African---Abaluhyan", "African---Akan", "African---American", "African---Bantu", "African---Botswana",
  "African---Egyptian", "African---Ethiopian", "African---Ewe", "African---Fanti", "African---Ghanian",
  "African---Hausa", "African---Ibo", "African---Kenyan", "African---Kikuyu", "African---Lesotho",
  "African---Lugandan", "African---Malawian", "African---Musoga", "African---Nguni", "African---Nigerian",
  "African---Ochi", "African---Rukonjo", "African---Runyoro", "African---Rutooro", "African---Rwandan",
  "African---Somalian", "African---Swahili", "African---Tanzanian", "African---Ugandan", "African---Xhosha",
  "African---Yoruba", "African---Yoruban", "African---Zimbabwe", "African---Zulu", "African---Zuni", "Arabic"
];

const categoryOptions = [
  "Nature", "God", "Love", "Birth Order", "Leadership and Royalty", "Virtues", 
  "Strength and Power", "Emotions", "Family Relations"
];

const letterOptions = [
  "A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

const BabyNameGenerator = () => {
    const { t } = useTranslation();
  const [gender, setGender] = useState('');
  const [origin, setOrigin] = useState('');
  const [category, setCategory] = useState('');
  const [length, setLength] = useState('');
  const [letter, setLetter] = useState('');
  const [names, setNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [expandedName, setExpandedName] = useState(null);
  const namesPerPage = 4;

  const generateNames = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`${config.apiUrl}/api/generate_name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender, origin, category, length, letter }), // Include all options
      });

      if (!response.ok) {
        throw new Error('Failed to generate names');
      }

      const data = await response.json();
      setNames(data.names);
      setCurrentPage(0); // Reset page to 0 when new names are generated
    } catch (error) {
      setError('An error occurred while generating names. Please try again.');
      console.error('Error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setGender('');
    setOrigin('');
    setCategory('');
    setLength('');
    setLetter('');
    setNames([]);
    setError(null);
    setCurrentPage(0); // Reset page when resetting
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toggleNameDetails = (name) => {
    setExpandedName((prevName) => (prevName === name ? null : name));
  };

  const currentNames = names.slice(currentPage * namesPerPage, (currentPage + 1) * namesPerPage);

  return (
    <PageContainer title="Baby Name Generator" sx={{ paddingTop: 0 }}>
      <Breadcrumb title={t("Baby Names Generator")} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="150px" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h5" align="center">
            {t('AI Baby Name Generator')}
          </StyledTypography>
          <AnimatePresence mode="wait">
            {!names.length && !generating && !error && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <StyledBox>
                  <FormControl fullWidth>
                    <InputLabel>{t('Gender')}</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>{t('Origin')}</InputLabel>
                    <Select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      label={t("Origin")}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {originOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>{t('Category')}</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label={t("Category")}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {categoryOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>{t('Length')}</InputLabel>
                    <Select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      label={t("Length")}
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="Short">Short</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Long">Long</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>{t('First letter')}</InputLabel>
                    <Select
                      value={letter}
                      onChange={(e) => setLetter(e.target.value)}
                      label={t("Letter")}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {letterOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={generateNames}
                    disabled={generating}
                  >
                    {t('Generate Names')}
                  </Button>
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
                <Typography variant="h6" align="center">Generating names...</Typography>
              </motion.div>
            )}
            {currentNames.length > 0 && (
              <motion.div
                key="names"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <StyledBox>
                  <NameList 
                    names={currentNames} 
                    expandedName={expandedName}
                    toggleNameDetails={toggleNameDetails}
                  />
                  {names.length > (currentPage + 1) * namesPerPage && (
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={handleLoadMore}
                      sx={{ marginTop: 2 }}
                    >
                      Load More
                    </Button>
                  )}
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