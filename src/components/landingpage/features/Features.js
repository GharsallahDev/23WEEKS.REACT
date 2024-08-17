import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, styled } from '@mui/material';
import { motion } from 'framer-motion';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ImageIcon from '@mui/icons-material/Image';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const FeatureButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: '20px',
  padding: '10px 20px',
  fontWeight: 600,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.background.paper,
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.background.paper,
    color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));


const features = {
  pregnant: [
    {
      title: '24/7 AI Chatbot',
      description: 'Get instant answers to your pregnancy questions.',
      icon: ChatIcon,
    },
    {
      title: 'Personalized Care Plans',
      description: 'Receive tailored advice based on your unique needs.',
      icon: AssignmentIcon,
    },
    {
      title: 'Symptom Tracker',
      description: 'Monitor your pregnancy symptoms and get timely alerts.',
      icon: TrackChangesIcon,
    },
  ],
  gynecologist: [
    {
      title: 'AI-Enhanced Imaging',
      description: 'Improve diagnostic accuracy with advanced ultrasound analysis.',
      icon: ImageIcon,
    },
    {
      title: 'Patient Management',
      description: 'Efficiently manage patient records and appointments.',
      icon: EventNoteIcon,
    },
    {
      title: 'Risk Assessment',
      description: 'Use AI to identify high-risk pregnancies early.',
      icon: AssessmentIcon,
    },
  ],
};

const Features = () => {
  const [activeTab, setActiveTab] = useState('pregnant');

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Key Features
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <FeatureButton
            startIcon={<PregnantWomanIcon />}
            active={activeTab === 'pregnant'}
            onClick={() => setActiveTab('pregnant')}
          >
            For Expectant Mothers
          </FeatureButton>
          <FeatureButton
            startIcon={<LocalHospitalIcon />}
            active={activeTab === 'gynecologist'}
            onClick={() => setActiveTab('gynecologist')}
            sx={{ ml: 2 }}
          >
            For Gynecologists
          </FeatureButton>
        </Box>

        <Grid container spacing={4}>
          {features[activeTab].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <feature.icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                      <Typography variant="h5" component="h3">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{feature.description}</Typography>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
