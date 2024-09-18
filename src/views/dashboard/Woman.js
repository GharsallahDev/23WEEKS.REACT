import React, { useState } from 'react';
import { Card,Box, Grid, Typography, TextField, Paper, Button, Slider, Tooltip } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';
import { useTranslation } from 'react-i18next';
import aboutUsImage from 'src/assets/images/aboutus/Untitled-13.png';

// Import images
import blueberryImg from 'src/assets/images/size/blueberry.png';
import avocadoImg from 'src/assets/images/size/avocado.png';
import lemonImg from 'src/assets/images/size/lemon.png';
import watermelonImg from 'src/assets/images/size/watermelon.png';
import pumpkinImg from 'src/assets/images/size/citrouille.png';
import melonImg from 'src/assets/images/size/melon.png';
import pineappleImg from 'src/assets/images/size/ananas.png';
import eggplantImg from 'src/assets/images/size/eggplant.png';
import apple from 'src/assets/images/size/apple.png';
import carotte from 'src/assets/images/size/carotte.png';
import cerise from 'src/assets/images/size/cerise.png';
import corn from 'src/assets/images/size/corn.png';
import dragonfruit from 'src/assets/images/size/dragonfruit.png';
import olive from 'src/assets/images/size/olive.png';
import pois from 'src/assets/images/size/pois.png';
import Swisschard from 'src/assets/images/size/Swiss-chard.png';
import cucumber from 'src/assets/images/size/cucumber.png';
import conconut from 'src/assets/images/size/noix-coco.png';

const fetalSizeMap = {
  3: { size: 'peas', img: pois },
  4: { size: 'pois', img: pois },
  5: { size: 'Blueberry', img: blueberryImg },
  6: { size: 'Blueberry', img: blueberryImg },
  7: { size: 'olive', img: olive },
  8: { size: 'olive', img: olive },
  9: { size: 'cerise', img: cerise },
  10: { size: 'cerise', img: cerise },
  11: { size: 'Lemon', img: lemonImg },
  12: { size: 'Lemon', img: lemonImg },
  13: { size: 'apple', img: apple },
  14: { size: 'apple', img: apple },
  15: { size: 'Avocado', img: avocadoImg },
  16: { size: 'Avocado', img: avocadoImg },
  17: { size: 'Avocado', img: avocadoImg },
  18: { size: 'carotte', img: carotte },
  19: { size: 'carotte', img: carotte },
  20: { size: 'carotte', img: carotte },
  21: { size: 'corn', img: corn },
  22: { size: 'corn', img: corn },
  23: { size: 'corn', img: corn },
  24: { size: 'Eggplant', img: eggplantImg },
  25: { size: 'Eggplant', img: eggplantImg },
  26: { size: 'Eggplant', img: eggplantImg },
  27: { size: 'cucumber', img: cucumber },
  28: { size: 'cucumber', img: cucumber },
  29: { size: 'conconut', img: conconut },
  30: { size: 'conconut', img: conconut },
  31: { size: 'Pineapple', img: pineappleImg },
  32: { size: 'Pineapple', img: pineappleImg },
  33: { size: 'dragonfruit', img: dragonfruit },
  34: { size: 'dragonfruit', img: dragonfruit },
  35: { size: 'Melon', img: melonImg },
  36: { size: 'Melon', img: melonImg },
  37: { size: 'Swiss chard', img: Swisschard },
  38: { size: 'Swiss chard', img: Swisschard },
  39: { size: 'Watermelon', img: watermelonImg },
  40: { size: 'Pumpkin', img: pumpkinImg },
  41: { size: 'Pumpkin', img: pumpkinImg },
};

const FetalSizeSlider = ({ selectedWeek, setSelectedWeek }) => {
  const { t } = useTranslation(); // Add useTranslation here

  const handleSliderChange = (event, newValue) => {
    setSelectedWeek(newValue);
  };

  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;
    const size = fetalSizeMap[value]?.size || '';

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={t('Week {{value}} ({{size}})', { value, size })}>
        {children}
      </Tooltip>
    );
  };

  const currentSize = fetalSizeMap[selectedWeek]?.size || '';
  const currentImage = fetalSizeMap[selectedWeek]?.img || '';

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t('Find Out Your Baby\'s Size')}
      </Typography>
      <Slider
        value={selectedWeek}
        min={3}
        max={41}
        step={1}
        marks
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}`}
        components={{ ValueLabel: ValueLabelComponent }}
        sx={{ width: '80%', mx: 'auto', mb: 2 }}
        aria-labelledby="fetal-size-slider"
      />
      <Typography variant="h6" gutterBottom>
        {t('Week {{selectedWeek}}', { selectedWeek })}
      </Typography>
      {currentImage && (
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', width: '100%', maxWidth: '300px', mx: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            {t('Your Baby is About the Size of a {{size}}', { size: currentSize })}
          </Typography>
          <img src={currentImage} alt={t('Week {{selectedWeek}}', { selectedWeek })} style={{ width: '80%', borderRadius: '8px' }} />
        </Paper>
      )}
    </Box>
  );
};

const PregnancyDashboard = () => {
  const { t } = useTranslation(); // Add useTranslation here
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

          {/* Fetal Size Slider */}
          <Grid item xs={12} lg={12}>
            <FetalSizeSlider selectedWeek={weeks} setSelectedWeek={setWeeks} />
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