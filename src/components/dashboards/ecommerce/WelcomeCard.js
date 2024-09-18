import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import welcomeImg from 'src/assets/images/backgrounds/baby-inside-woman-womb.png';
import { useSelector } from 'react-redux';

const WelcomeCard = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  const pregnancyWeek = 18;
  const babySize = t('a lime');

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Card
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          width: '100%', 
          maxWidth: '100%', 
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3 }, // Adjust padding for different screen sizes
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center content
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={10} sm={7} sx={{ textAlign: { xs: 'left', sm: 'left' } }}>
              <Typography variant="h5" gutterBottom>
                {t('Welcome back {name}!', { name: user ? user.full_name : t('Full Name') })}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {t('Welcome To 23 Weeks!', {
                  week: pregnancyWeek,
                  size: babySize,
                })}
              </Typography>
              {/* Button can be added here if needed */}
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={welcomeImg}
                alt={t('Pregnancy visual')}
                style={{ maxWidth: '130px', width: '100%', height: 'auto' }} // Adjust size as needed
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WelcomeCard;
