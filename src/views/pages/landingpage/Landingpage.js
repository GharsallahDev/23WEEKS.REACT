import React from 'react';
import { Box } from '@mui/material';
import Header from 'src/components/landingpage/header/Header';
import HeroSection from 'src/components/landingpage/HeroSection';
import Features from 'src/components/landingpage/features/Features';
import Testimonials from 'src/components/landingpage/testimonial/Testimonial';
import AiTechnology from 'src/components/landingpage/AiTechnology';
import Pricing from 'src/components/landingpage/Pricing';
import CallToAction from 'src/components/landingpage/CallToAction';
import Footer from 'src/components/landingpage/footer/Footer';
import AnimateFadeIn from 'src/components/landingpage/animation/Animation';

const AnimatedSection = ({ children, delay = 0 }) => (
  <AnimateFadeIn>
    <Box sx={{ opacity: 0, animation: `fadeIn 0.5s ease-out ${delay}s forwards` }}>{children}</Box>
  </AnimateFadeIn>
);

const Landingpage = () => {
  return (
    <Box sx={{ width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}>
      <Header />
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Features />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <AiTechnology />
      </AnimatedSection>
      <AnimatedSection delay={0.8}>
        <Pricing />
      </AnimatedSection>
      <AnimatedSection delay={1}>
        <CallToAction />
      </AnimatedSection>
      <Footer />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Landingpage;
