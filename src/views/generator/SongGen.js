import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import axios from 'axios';
import breadcrumbImg from 'src/assets/images/breadcrumb/notes.png';
import config from 'src/config';

const BCrumb = [
  {
    to: '/',
    title: 'Generator',
  },
  {
    title: 'Songs',
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

const SongGenerator = () => {
  const [description, setDescription] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [songUrl, setSongUrl] = useState(null);
  const [error, setError] = useState('');

  // Handle the form input changes
  const handleGenerateSong = async () => {
    setLoading(true);
    setError('');
    setSongUrl(null); // Reset the song URL before generation

    try {
      const response = await axios.post(`${config.apiUrl}/api/generate-song`, {
        description,
        is_custom: isCustom,
        title,
        tags,
      });

      if (response.status === 200) {
        setSongUrl(response.data.song_url); // Set the song URL to play
      } else {
        setError(response.data.error || 'An error occurred while generating the song.');
      }
    } catch (err) {
      console.error('Error generating song:', err);
      setError('An error occurred while generating the song.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Song Generator" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Song Generator" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="200px" className="image" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h7" align="center">
            <h2>Generate a Song</h2>
          </StyledTypography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            Please note that the song generation process may take a few minutes. We appreciate your
            patience.
          </Alert>

          <TextField
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a song description"
            multiline
            rows={4}
            sx={{ mb: 2, width: '100%' }}
          />

          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>

            {isCustom && (
              <>
                <TextField
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter song title"
                  sx={{ mb: 2, width: '100%' }}
                />

                <TextField
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter song tags (comma separated)"
                  sx={{ mb: 2, width: '100%' }}
                />
              </>
            )}

            {/* Display a "Please wait" message with CircularProgress while loading */}
            {loading && (
              <Box display="flex" alignItems="center" flexDirection="column" mt={2} mb={2}>
                <CircularProgress color="primary" />
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Please wait, we are generating your song...
                </Typography>
              </Box>
            )}

            <Button
              color="primary"
              variant="contained"
              onClick={handleGenerateSong}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Generating...' : 'Generate Song'}
            </Button>
          </Box>

          {/* Display any error messages */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Display the audio player once the song URL is available */}
          {songUrl && (
            <Box mt={4} textAlign="center">
              <audio controls>
                <source src={songUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Box>
          )}
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default SongGenerator;
