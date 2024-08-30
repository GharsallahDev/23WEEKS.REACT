import React, { useState, useEffect } from 'react';
import './StoryGenerator.css';
import { Box, Typography, Button, Paper, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/storyGen.png';
import config from 'src/config';
import { useTranslation } from 'react-i18next';

const BCrumb = [
  {
    to: '/',
    title: 'Generator',
  },
  {
    title: 'Stories',
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

const formatText = (text) => {
  return text
    .split('\n')
    .map((line, index) => (
      <p key={index}>
        {line.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
      </p>
    ));
};

const StoryGenerator = () => {
    const { t } = useTranslation();
    const [topic, setTopic] = useState('');
    const [chapters, setChapters] = useState(1);
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);
    const [storyContent, setStoryContent] = useState([]);
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null); // Store the PDF URL
  
    const handleLanguageChange = (e) => setLanguage(e.target.value);
    const handleTopicChange = (e) => setTopic(e.target.value);
    const handleChaptersChange = (e) => setChapters(Number(e.target.value));
  
    const handleGenerateStory = async () => {
      setLoading(true);
      setStoryContent([]);
      setCurrentText('');
      setCurrentIndex(0);
      setImages([]);
      setPdfUrl(null);
  
      try {
        const response = await fetch(`${config.apiUrl}/api/generate-story`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, chapters, language }),
          });
          
  
        const data = await response.json();
  
        if (response.ok) {
          setStoryContent(data.story);
          setImages(new Array(data.story.length).fill(null)); // Placeholder for images
  
          data.images.forEach((image, i) => {
            setImages((prevImages) => {
              const newImages = [...prevImages];
              newImages[i] = image;
              return newImages;
            });
          });
  
          // Set the PDF URL
          setPdfUrl(`http://localhost:5000${data.pdf_url}`);
        } else {
          console.error('Error generating story:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleOpenPdf = () => {
      if (pdfUrl) {
          window.open(pdfUrl, '_blank');
      } else {
          console.error('PDF URL is not available.');
      }
  };
  
    useEffect(() => {
      if (storyContent.length && currentIndex < storyContent.length) {
        const timeoutId = setTimeout(() => {
          setCurrentText((prev) => prev + storyContent[currentIndex].charAt(currentText.length));
          if (currentText.length >= storyContent[currentIndex].length) {
            setTimeout(() => {
              setCurrentIndex((prev) => prev + 1);
              setCurrentText('');
            }, 1000); // Delay before moving to the next chapter
          }
        }, 25); // Speed for the typewriter effect
        return () => clearTimeout(timeoutId);
      }
    }, [storyContent, currentText, currentIndex]);

  return (
    <PageContainer title={t('Story Generator')} sx={{ paddingTop: 0 }}>
      <Breadcrumb title={t('Story Generator')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="120px" className="image" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h7" align="center">
            <h2>
              {t('Generate a Story')}
            </h2>
          </StyledTypography>

          <label htmlFor="topic" style={{ paddingBottom: '10px' }}>
            {t('Enter Topic')}:
          </label>
          <TextField
            id="topic"
            type="text"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter a story topic"
            className="input-field"
          />

          <label htmlFor="chapters">{t('Number of Chapters')}:</label>
          <input
            id="chapters"
            type="number"
            value={chapters}
            onChange={handleChaptersChange}
            min="1"
            max="5"
            className="input"
          />

          <label htmlFor="language">{t('Choose Language')}:</label>
          <select
            id="language"
            value={language}
            fullWidth
            variant="outlined"
            onChange={handleLanguageChange}
            className="input"
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="arabic">Arabic</option>
            <option value="amharic">Amharic</option>
            <option value="swahili">Swahili</option>
          </select>

          <Button
            color="primary"
            variant="contained"
            onClick={handleGenerateStory}
            disabled={loading}
            className="generate-button"
          >
            {loading ? t('Generating...') : t('Generate Story')}
          </Button>

          <div className="story-container">
            {storyContent.map((chapter, index) => (
              <div key={`chapter-${index}`} className="chapter-container">
                {index === currentIndex ? (
                  <>
                    <div className="story-text">{formatText(currentText)}</div>
                    {currentText.length >= storyContent[currentIndex].length && images[index] && (
                      <div className="image-placeholder">
                        <img src={images[index]} alt={`Chapter ${index + 1} illustration`} />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="story-text">{formatText(chapter)}</div>
                    {images[index] && (
                      <div className="image-placeholder">
                        <img src={images[index]} alt={`Chapter ${index + 1} illustration`} />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {currentIndex === storyContent.length && pdfUrl && (
            <Button variant="contained" color="secondary" onClick={handleOpenPdf}>
              {t('Open PDF')}
            </Button>
          )}
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default StoryGenerator;
