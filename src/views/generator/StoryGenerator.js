import React, { useState, useEffect, useRef } from 'react';
import './StoryGenerator.css';
import { Box, Typography, Button, Paper, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/storyGen.png';
import config from 'src/config';
const BCrumb = [
  {
    to: '/',
    title: 'Generator',
  },
  {
    title: 'Stories for Kids',
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

const AudioControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  '& > *': {
    margin: theme.spacing(0, 1),
  },
}));

const StoryGenerator = () => {
  const [topic, setTopic] = useState('');
  const [chapters, setChapters] = useState(0);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [storyContent, setStoryContent] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [soundLoading, setSoundLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
    setAudioUrl(null);

    try {
      const response = await fetch(`${config.apiUrl}/api/generate-story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, chapters, language }),
      });

      if (!response.ok) {
        console.error('Error generating story:', response.statusText);
        return;
      }

      const data = await response.json();
      setStoryContent(data.story);
      setImages(new Array(data.story.length).fill(null));

      data.images.forEach((image, i) => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[i] = image;
          return newImages;
        });
      });

      setPdfUrl(`http://localhost:5000${data.pdf_url}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSound = async () => {
    setSoundLoading(true);
    try {
      const storyText = storyContent.join(' ');
      const response = await fetch(`${config.apiUrl}/api/generate_sound`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: storyText, language }),
      });

      if (!response.ok) {
        console.error('Error generating sound:', response.statusText);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error generating sound:', error);
    } finally {
      setSoundLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
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
          }, 1000);
        }
      }, 25);
      return () => clearTimeout(timeoutId);
    }
  }, [storyContent, currentText, currentIndex]);

  useEffect(() => {
    // Cleanup the audio when the component is unmounted
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // Stop the audio from playing
        audioRef.current.load();
      }
    };
  }, []);

  return (
    <PageContainer title="Story Generator" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Story Generator" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="120px" className="image" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h7" align="center">
            <h2>
              Generate a Story with <span className="bold">AMARI</span>
            </h2>
          </StyledTypography>

          <label htmlFor="topic" style={{ paddingBottom: '10px' }}>
            Enter Topic:
          </label>
          <TextField
            id="topic"
            type="text"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter a story topic"
            className="input-field"
          />

          <label htmlFor="chapters">Number of Chapters:</label>
          <input
            id="chapters"
            type="number"
            value={chapters}
            onChange={handleChaptersChange}
            min="1"
            max="5"
            className="input"
          />

          <label htmlFor="language">Choose Language:</label>
          <select id="language" value={language} onChange={handleLanguageChange} className="input">
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="am">Amharic</option>
            <option value="sw">Swahili</option>
          </select>

          <Button
            color="primary"
            variant="contained"
            onClick={handleGenerateStory}
            disabled={loading}
            className="generate-button"
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </Button>

          {storyContent.length > 0 && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleGenerateSound}
              disabled={soundLoading}
              className="generate-button"
              style={{ marginTop: '20px' }}
            >
              {soundLoading ? 'Generating Sound...' : 'Generate Sound'}
            </Button>
          )}

          {audioUrl && language === 'en' && (
            <AudioControlsContainer>
              <Button color="primary" variant="contained" onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button color="secondary" variant="contained" onClick={handleStop}>
                Stop
              </Button>
              <audio ref={audioRef} src={audioUrl} />
            </AudioControlsContainer>
          )}

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
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default StoryGenerator;
