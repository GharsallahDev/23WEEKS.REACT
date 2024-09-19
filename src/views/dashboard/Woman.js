import React, { useState } from 'react';
import { Box, Grid, Typography, Card, Button } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import { useTranslation } from 'react-i18next';
import aboutUsImage from 'src/assets/images/aboutus/Untitled-13.png';
import Pregnant from './pregnant';  // Import Pregnant component

const PregnancyDashboard = () => {
  const { t } = useTranslation();
  const [weeks, setWeeks] = useState(3);
  const [error, setError] = useState('');

  const handleWeeksChange = (event) => {
    const inputWeeks = parseInt(event.target.value, 10);

    if (inputWeeks < 3 || inputWeeks > 41 || isNaN(inputWeeks)) {
      setError(t('Please enter a value between 3 and 41 weeks.'));
      setWeeks(3);
    } else {
      setError('');
      setWeeks(inputWeeks);
    }
  };

  return (
    <PageContainer title={t('Pregnancy Dashboard')}>
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12} lg={12}>
            <WelcomeCard />
          </Grid>

          {/* Inspirational Section */}
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            sx={{
              background: (theme) => theme.palette.primary.light,
              p: 4,
              borderRadius: '12px',
              mt: 4
            }}
          >
            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: '#dd1367', fontWeight: 'bold', mb: 3 }}
              >
                {t('Embrace Your Beautiful Journey')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
              >
                {t('Congratulations on this incredible journey you\'re embarking on! Pregnancy is a remarkable time filled with growth, excitement, and profound changes.')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
              >
                {t('At 23weeks, we\'re here to support you every step of the way, helping you navigate through each stage of your pregnancy with ease and joy.')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
              >
                {t('Cherish every moment, and remember, you\'re not alone—your new adventure is just beginning, and we\'re thrilled to be part of it!')}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, backgroundColor: '#dd1367', borderRadius: '20px', padding: '10px 20px' }}
                href="/features"
              >
                {t('Explore Features')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={aboutUsImage}
                alt={t('Pregnancy Journey')}
                style={{ maxWidth: '100%', borderRadius: '12px' }}
              />
            </Grid>
          </Grid>

          {/* Pregnant Component (Weeks Progression) */}
          <Grid item xs={12} lg={12}>
            <Pregnant />  {/* Replace FetalSizeSlider with Pregnant component */}
          </Grid>

          {/* Additional Section (e.g., Latest News) */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Card
              elevation={3}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                padding: 3,
                borderRadius: '12px',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.primary.main
                }}
              >
                {t('Latest News & Updates')}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
              >
                {t('Stay updated with the latest news and tips about pregnancy, health, and wellness. Our team is dedicated to providing you with valuable information to help you through your journey.')}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2, borderColor: '#dd1367', color: '#dd1367' }}
                href="/news"
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

export default PregnancyDashboard;
