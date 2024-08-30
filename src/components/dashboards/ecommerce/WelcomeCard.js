import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import welcomeImg from 'src/assets/images/backgrounds/baby-inside-woman-womb.png';
import { useSelector } from 'react-redux';

const WelcomeCard = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  const pregnancyWeek = 18;
  const babySize = t('a lime');

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        minHeight: 'auto', // Reduce card height
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 }, // Reduced padding
          '&:last-child': { pb: { xs: 2, sm: 2.5 } }, // Reduced padding
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" gutterBottom>
                {t('Welcome back {name}!', { name: user ? user.full_name : t('Full Name') })}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {t('Week {week}: Your baby is about the size of {size}.', {
                  week: pregnancyWeek,
                  size: babySize,
                })}
              </Typography>
              <Button variant="contained" color="primary" size="medium">
                {t('Track Progress')}
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
              src={welcomeImg}
              alt={t('Pregnancy visual')}
              style={{ maxWidth: '130px', width: '100%', height: 'auto' }} // Slightly reduced max-width
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;