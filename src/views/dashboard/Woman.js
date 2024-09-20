import React from 'react';
import { Box, Grid, Typography, Card, Button, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import pregnant from 'src/assets/images/2.png';
import { useTranslation } from 'react-i18next';
import Pregnant from './components/WeekFruit';
import { useSelector } from 'react-redux';

const Woman = () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
                    {t(
                      "women_card_message",
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: '1.0rem', lineHeight: 1.6, color: '#555', mb: 3 }}
                  >
                    {t(
                      "Cherish every moment, and remember, you're not alone—your new adventure is just beginning, and we're thrilled to be part of it!",
                    )}
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