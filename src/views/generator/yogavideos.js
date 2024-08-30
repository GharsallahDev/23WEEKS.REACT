import React, { useState } from 'react';
import { Box, Typography, Paper, Container, TextField, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/Yoga.png';
import videosData from 'src/yogavideos';

const BCrumb = [
  {
    to: '/',
    title: 'Yoga for Pregnant Women',
  },
  {
    title: 'Videos',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
  width: '100%',
  maxWidth: 600, // Limit the width of each paper
  marginBottom: theme.spacing(4),
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const VideoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

const VideoDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const VideoThumbnail = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  objectFit: 'cover',
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function YogaVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [query, setQuery] = useState('');

  const filteredVideos = Array.isArray(videosData) ? videosData.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase()) || video.description.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <PageContainer title="Yoga for Pregnant Women" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Yoga Videos" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Yoga" width="120px" className="image" />
        </Box>
      </Breadcrumb>

      <StyledContainer>
        <TextField
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          fullWidth
          sx={{ marginBottom: 4 }}
        />

        {selectedVideo ? (
          <StyledPaper>
            <StyledTypography variant="h5" align="center">
              {selectedVideo.title}
            </StyledTypography>
            <video width="100%" controls>
              <source src={selectedVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {selectedVideo.description}
            </Typography>
            <StyledButton onClick={() => setSelectedVideo(null)} sx={{ marginTop: 2 }}>
              Back to List
            </StyledButton>
          </StyledPaper>
        ) : (
          <Grid container spacing={4}>
            {filteredVideos.map((video, index) => (
              <Grid item xs={12} sm={6} key={index}> {/* Updated to display 2 items per row */}
                <StyledPaper onClick={() => handleVideoSelect(video)}>
                  <VideoThumbnail src={video.thumbnail} alt={video.title} />
                  <VideoTitle variant="h6">
                    {video.title}
                  </VideoTitle>
                  <VideoDescription variant="body2">
                    {video.description}
                  </VideoDescription>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        )}
      </StyledContainer>
    </PageContainer>
  );
}

export default YogaVideos;
