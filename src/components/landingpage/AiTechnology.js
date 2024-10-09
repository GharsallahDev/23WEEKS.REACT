import { technology } from '../../constants/index';
import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, styled } from '@mui/material';
import { Element } from 'react-scroll';
import clsx from 'clsx';
import { gsap } from 'gsap';

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

const AiTechnology = () => {
  // Add GSAP animations
  useEffect(() => {
    gsap.fromTo(
      '.tech-card',
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
  }, []);

  return (
    <section>
      <Element name="pricing" id="Features">
        <div className="container">
          <div className="pricing-head_before relative mx-auto pt-3 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
            <h3 className="h4 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-5 mt-40 max-w-lg text-center text-p6 max-md:mb-11 max-sm:max-w-sm">
              Our AI Technology
            </h3>
            <h6 className=" text-lg max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-gray-500 max-md:mb-11 max-sm:max-w-sm">
              Leveraging cutting-edge artificial intelligence to revolutionize prenatal care
            </h6>
          </div>
          <div className="scroll-hide relative z-2 mt-16 flex items-start max-xl:gap-5 max-xl:overflow-auto max-xl:pt-6">
            <Grid container spacing={3}>
              {technology.map((tech, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div style={{ height: '100%' }}>
                    <StyledCard
                      className="tech-card"
                      style={{
                        backgroundColor: '#fff6f9',
                        borderRadius: '25px',
                        padding: '15px',
                      }}
                    >
                      <CardContentStyled className=" items-center text-center">
                        <Box className=" place-items-center">
                          <tech.icon
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
                            {tech.title}
                          </h3>
                        </Box>
                        <h6 className=" text-base mt-5  font-poppins z-3 relative mx-auto max-w-lg text-gray-500 max-md:mb-11 max-sm:max-w-sm ">
                          {tech.description}
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

export default AiTechnology;
