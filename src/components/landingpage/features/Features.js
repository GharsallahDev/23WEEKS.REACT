import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, styled } from '@mui/material';
import { Element } from 'react-scroll';
import clsx from 'clsx';
import Button from '../../Button';
import { gsap } from 'gsap';

import ChatIcon from '@mui/icons-material/Chat';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import SearchIcon from '@mui/icons-material/Search';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ImageIcon from '@mui/icons-material/Image';
import AssessmentIcon from '@mui/icons-material/Assessment';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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
      title: 'Story Generation',
      description: 'Receive personalized stories for your upcoming fetus.',
      icon: EmojiObjectsIcon,
    },
    {
      title: 'Songs Generation',
      description: 'Listen to personalized songs for relaxation and bonding.',
      icon: MusicNoteIcon,
    },
    {
      title: 'Baby Names Suggestions',
      description: 'Get suggestions for baby names based on your preferences.',
      icon: BabyChangingStationIcon,
    },
    {
      title: 'Search Engine',
      description: 'Search for relevant information and resources easily.',
      icon: SearchIcon,
    },
    {
      title: 'Maternity Fitness Plans',
      description: 'Receive customized fitness plans to stay healthy during pregnancy.',
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
      title: 'Fetal Plane Classification',
      description: 'Classify fetal planes for better assessment.',
      icon: AssessmentIcon,
    },
    {
      title: 'Head Circumference Measurement',
      description: 'Accurately measure fetal head circumference from ultrasound images.',
      icon: AssessmentIcon,
    },
    {
      title: 'Report Generation',
      description: 'Generate comprehensive reports from ultrasound data.',
      icon: AssessmentIcon,
    },
    {
      title: 'Ultrasound Anomaly Detection',
      description: 'Detect anomalies in ultrasound images using AI.',
      icon: AssessmentIcon,
    },
    {
      title: 'Fetal Health Tracking',
      description: 'Track fetal health metrics and receive alerts.',
      icon: AssessmentIcon,
    },
  ],
};

const Features = () => {
  const [activeTab, setActiveTab] = useState('pregnant');

  // Add GSAP animations
  useEffect(() => {
    gsap.fromTo(
      '.feature-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeTab]);

  return (
    <section>
      <Element name="pricing" id="Features">
        <div className="container">
          <div className="pricing-head_before relative mx-auto pt-3 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
            <h3 className="h4 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p6 max-md:mb-11 max-sm:max-w-sm">
              Key Features
            </h3>
            <div className="relative z-4 mx-auto flex w-[375px] rounded-3xl border-[3px] border-s8/50 bg-s8/30 p-2 backdrop-blur-[6px] max-md:w-[310px]">
              <button
                className={clsx(
                  'pricing-head_btn',
                  activeTab === 'pregnant' && 'text-p4'
                )}
                onClick={() => setActiveTab('pregnant')}
              >
                Mothers-To-Be
              </button>
              <button
                className={clsx(
                  'pricing-head_btn',
                  activeTab === 'gynecologist' && 'text-p4'
                )}
                onClick={() => setActiveTab('gynecologist')}
              >
                Gynecologists
              </button>
              <div
                className={clsx(
                  'g4 rounded-14 before:h-100 pricing-head_btn_before absolute left-2 top-2 h-[calc(100%-16px)] w-[calc(50%-8px)] overflow-hidden shadow-400 transition-transform duration-500',
                  activeTab === 'gynecologist' && 'translate-x-full'
                )}
              />
            </div>
          </div>
          <div className="scroll-hide relative z-2 mt-16 flex items-start max-xl:gap-5 max-xl:overflow-auto max-xl:pt-6">
            <Grid container spacing={3}>
              {features[activeTab].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div style={{ height: '100%' }}>
                    <StyledCard
                      className="feature-card"
                      style={{
                        backgroundColor: '#fff6f9',
                        borderRadius: '25px',
                        padding: '15px',
                      }}
                    >
                      <CardContentStyled className=" items-center text-center">
                        <Box className=" place-items-center">
                          <feature.icon
                            sx={{
                              fontSize: 70,
                              color: 'primary.main',
                              mb: 2,
                              backgroundColor: '#ffe4f0',
                              borderRadius: '50%',
                            }}
                            style={{ padding: '15px' }}
                          />
                          <h3 className=" text-xl font-medium font-poppins z-3 relative mx-auto max-w-lg text-p6 max-md:mb-11 max-sm:max-w-sm">
                            {feature.title}
                          </h3>
                        </Box>
                        <h6 className=" text-base mt-5  font-poppins z-3 relative mx-auto max-w-lg text-gray-500 max-md:mb-11 max-sm:max-w-sm ">
                          {feature.description}
                        </h6>
                      </CardContentStyled>
                    </StyledCard>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Features;
