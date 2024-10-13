import React from 'react';
import { Box, Grid, Typography, Card, Button, Video } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import pregnant from 'src/assets/images/2.png';
import { useTranslation } from 'react-i18next';
import Pregnant from './components/WeekFruit'; 
import { useSelector } from 'react-redux';
import pregnancyWeeksData from './components/pregnancyweek'; 
import { AccessAlarm, EmojiPeople, CheckCircle, LocalDining } from '@mui/icons-material'; 

const Woman = () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get the current pregnancy week
  const currentWeek = useSelector((state) => state.auth.user?.current_pregnancy_week) || 1;

  // Access the data for the current week
  const weekData = pregnancyWeeksData[currentWeek];

  // Define the paths to the videos for each trimester
  const trimesterVideos = {
    first: require('src/assets/images/videos/The First Trimester.mp4'),   
    second: require('src/assets/images/videos/Second Trimester.mp4'), 
    third: require('src/assets/images/videos/Third Trimester.mp4'),   
  };
  // Determine the current trimester based on the current week
  let videoSrc;
  if (currentWeek >= 1 && currentWeek <= 12) {
    videoSrc = trimesterVideos.first;
  } else if (currentWeek >= 13 && currentWeek <= 26) {
    videoSrc = trimesterVideos.second;
  } else if (currentWeek >= 27 && currentWeek <= 40) {
    videoSrc = trimesterVideos.third;
  }

  const handleBlogRedirect = () => {
    navigate('/apps/blog/posts');
  };

  return (
    <PageContainer title={t('Pregnancy Dashboard')}>
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.light,
                borderRadius: '16px',
                overflow: 'hidden',
                height: '400px',
              }}
            >
              <Grid container sx={{ height: '100%' }}>
                {/* Left section: Text content */}
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ color: '#dd1367', fontWeight: 'bold', mb: 3 }}
                  >
                    {t('welcome_back', { name: user ? user.full_name : 'Full Name' })}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: '1.0rem', lineHeight: 1.6, color: '#555', mb: 3 }}
                  >
                    {t("women_card_message1")}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: '1.0rem', lineHeight: 1.6, color: '#555', mb: 3 }}
                  >
                    {t("women_card_message2")}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: '#dd1367',
                      borderRadius: '20px',
                      padding: '10px 20px',
                      alignSelf: 'flex-center',
                      '&:hover': {
                        backgroundColor: '#b81058',
                      },
                    }}
                    href="/features"
                  >
                    {t('Explore Features')}
                  </Button>
                </Grid>
                {/* Right section: Image */}
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={pregnant}
                    alt={t('Pregnancy Journey')}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Pregnant Component (Weeks Progression) */}
          <Grid item xs={12}>
            <Pregnant />
          </Grid>

          {/* Current Week Information */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: '12px', p: 3 }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.8rem', 
                  color: '#dd1367', 
                  textAlign: 'center',
                  marginBottom: '40px'
                }} 
              >
                {weekData.title}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.2rem', 
                  color: '#555', 
                  textAlign: 'center', 
                  lineHeight: '1.5' 
                }} 
              >
                {weekData.description}
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.2rem', 
                  color: '#555', 
                  textAlign: 'center', 
                  lineHeight: '1.5' 
                }} 
              >
                <AccessAlarm sx={{ verticalAlign: 'middle', marginRight: '8px', color: '#dd1367' }} />
                <strong style={{ color: '#dd1367', fontSize: '1.4rem' }}>Baby Development:</strong> {weekData.babyDevelopment}
              </Typography>

              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.2rem', 
                  color: '#555', 
                  textAlign: 'center', 
                  lineHeight: '1.5' 
                }} 
              >
                <CheckCircle sx={{ verticalAlign: 'middle', marginRight: '8px', color: '#dd1367' }} />
                <strong style={{ color: '#dd1367', fontSize: '1.4rem' }}>Tips:</strong> {weekData.tips}
              </Typography>

              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.2rem', 
                  color: '#555', 
                  textAlign: 'center', 
                  lineHeight: '1.5' 
                }} 
              >
                <LocalDining sx={{ verticalAlign: 'middle', marginRight: '8px', color: '#dd1367' }} />
                <strong style={{ color: '#dd1367', fontSize: '1.4rem' }}>Nutrition:</strong> {weekData.nutrition}
              </Typography>
            </Card>
          </Grid>

          {/* Video Section for Trimesters */}
          <Grid item xs={12}>
            {videoSrc && (
              <Card elevation={3} sx={{ borderRadius: '12px', p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: (theme) => theme.palette.primary.main, textAlign: 'center' ,fontSize: '1.8rem'}}
                >
                  {t('Trimester Video')}
                </Typography>
                <video width="100%" controls>
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Card>
            )}
          </Grid>

          {/* Blog Section (formerly Latest News & Updates) */}
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: '12px',
                p: 3,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 'bold', color: (theme) => theme.palette.primary.main }}
              >
                {t('From Our Pregnancy Blog')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1.0rem', lineHeight: 1.6, color: '#555', mb: 3 }}
              >
                {t('Explore our latest articles to support you through your pregnancy journey.')}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#dd1367',
                  color: '#dd1367',
                  '&:hover': {
                    borderColor: '#b81058',
                    color: '#b81058',
                  },
                }}
                onClick={handleBlogRedirect}
              >
                {t('Read More')}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Woman;
