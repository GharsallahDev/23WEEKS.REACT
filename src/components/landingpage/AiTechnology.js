import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    icon: SmartToyIcon,
    title: 'Advanced AI Algorithms',
    description:
      'Our AI uses state-of-the-art machine learning models to provide personalized advice and support.',
  },
  {
    icon: DataUsageIcon,
    title: 'Data-Driven Insights',
    description:
      'We analyze vast amounts of medical data to offer accurate predictions and recommendations.',
  },
  {
    icon: SecurityIcon,
    title: 'Privacy and Security',
    description:
      'Your data is protected with enterprise-grade encryption and follows strict privacy guidelines.',
  },
];

const AiTechnology = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our AI Technology
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Leveraging cutting-edge artificial intelligence to revolutionize prenatal care
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <feature.icon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom align="center">
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AiTechnology;
