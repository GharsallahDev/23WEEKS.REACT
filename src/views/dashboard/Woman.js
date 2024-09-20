import React, { useState } from 'react';
import { Box, Grid, Typography, Card, Button, CardContent } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import pregnant from 'src/assets/images/2.png';
import { useTranslation } from 'react-i18next';
import Pregnant from './pregnant'; // Import Pregnant component
import { useSelector } from 'react-redux';
const Woman= () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  // const [weeks, setWeeks] = useState(3);
  // const [error, setError] = useState('');

  // const handleWeeksChange = (event) => {
  //   const inputWeeks = parseInt(event.target.value, 10);

  //   if (inputWeeks < 3 || inputWeeks > 41 || isNaN(inputWeeks)) {
  //     setError(t('Please enter a value between 3 and 41 weeks.'));

  //     setWeeks(3);
  //   } else {
  //     setError('');

  //     setWeeks(inputWeeks);
  //   }
  // };

  return (
    <PageContainer title={t('Pregnancy Dashboard')}>
      <Box mt={5}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Card
            elevation={0}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              minHeight: 'auto', // Reduce card height
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            <CardContent
              sx={{
                p: { xs: 8, sm: 8}, // Reduced padding
                '&:last-child': { pb: { xs: 8, sm: 8 } }, // Reduced padding
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={7}>
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography
                      variant="h1"
                      gutterBottom
                      sx={{ color: '#dd1367', fontWeight: 'bold', mb: 5 }}
                    >
                      Welcome back {user ? user.full_name : 'Full Name'}!
                    </Typography>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
                    >
                      {t(
                        "Congratulations on this incredible journey you're embarking on! Pregnancy is a remarkable time filled with growth, excitement, and profound changes.",
                      )}
                    </Typography>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
                    >
                      {t(
                        "At 23weeks, we're here to support you every step of the way, helping you navigate through each stage of your pregnancy with ease and joy.",
                      )}
                    </Typography>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
                    >
                      {t(
                        "Cherish every moment, and remember, you're not alone—your new adventure is just beginning, and we're thrilled to be part of it!",
                      )}
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        backgroundColor: '#dd1367',
                        borderRadius: '20px',
                        padding: '10px 20px',
                      }}
                      href="/features"
                    >
                      {t('Explore Features')}
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}
                >
                  <img
                    src={pregnant}
                    alt={t('Pregnancy Journey')}
                    style={{ maxWidth: '100%', borderRadius: '12px' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Pregnant Component (Weeks Progression) */}

          <Grid item xs={12} lg={12}>
            <Pregnant /> {/* Replace FetalSizeSlider with Pregnant component */}
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
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                {t('Latest News & Updates')}
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: 1.6, color: '#555' }}
              >
                {t(
                  'Stay updated with the latest news and tips about pregnancy, health, and wellness. Our team is dedicated to providing you with valuable information to help you through your journey.',
                )}
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

export default Woman;
