import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Image from 'src/assets/images/landingpage/aicare.png';

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.light',
        py: 8,
        mb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              AI-Powered Prenatal Care
            </Typography>
            <Typography variant="h5" paragraph>
              Empowering expectant mothers and gynecologists with personalized support and advanced
              diagnostics.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/auth/register"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to=""
            >
              Learn More
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Add an illustration or image here */}
            <Box
              sx={{
                width: '100%',
                height: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={Image}
                alt="AI Care"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
