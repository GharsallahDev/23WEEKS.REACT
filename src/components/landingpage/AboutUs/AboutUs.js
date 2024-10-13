import React from 'react';
import { Box, Container, Typography, Grid, Avatar, IconButton } from '@mui/material';
import Mission from '../../../assets/images/aboutus/pregwoman.png'; // Use your image path
import AboutImage from '../../../assets/images/aboutus/mission.png'; // Use your image path
import Vision from '../../../assets/images/aboutus/ai.png'; // Use your image path
import Header from '../header/Header';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { members } from '../../../constants/index';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Footer from 'src/components/landingpage/footer/Footer';

const AboutAndMission = () => {
  return (
    <>
      <Header />
      <section className="relative pt-32 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
        <Element name="hero">
          <div className="container">
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ textAlign: { xs: 'center', md: 'left' } }} // Center text on small screens, left align on larger
            >
              {/* About Text */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }} // Start faded and lower
                  animate={{ opacity: 1, y: 0 }} // Move up and fade in
                  transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                >
                  <motion.h1
                    className="font-poppins mb-6 h2 text-black uppercase max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
                    initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
                    animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                    transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                  >
                    About{' '}
                    <span className="text-p6" style={{ fontFamily: 'Anton' }}>
                      {' '}
                      23 Weeks
                    </span>
                  </motion.h1>
                  <motion.p
                    className="max-w-440 mb-14 body-1 max-md:mb-10"
                    initial={{ opacity: 0, x: -30 }} // Starts faded out and shifted left
                    animate={{ opacity: 1, x: 0 }} // Moves to its correct position
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} // Slight delay for a staggered effect
                  >
                    23WEEKS simplifies the pregnancy journey for parents and boosts gynecological
                    care with AI to enhance patient management and diagnostics.
                  </motion.p>
                </motion.div>
              </Grid>

              {/* About Image */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }} // Start faded and shifted to the right
                  animate={{ opacity: 1, x: 0 }} // Move to correct position
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src={AboutImage}
                      alt="23weeks"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </div>
        </Element>
      </section>
      <section className="relative pt-32 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
        <Element name="hero">
          <div className="container">
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ textAlign: { xs: 'center', md: 'left' } }} // Center text on small screens, left align on larger
            >
              {/* About Image */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }} // Start faded and shifted to the left
                  animate={{ opacity: 1, x: 0 }} // Move to correct position
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src={Mission}
                      alt="23weeks"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </Box>
                </motion.div>
              </Grid>

              {/* About Text */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }} // Start faded and lower
                  animate={{ opacity: 1, y: 0 }} // Move up and fade in
                  transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                >
                  <motion.h1
                    className="font-poppins mb-6 h2 text-black uppercase max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
                    initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
                    animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                    transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                  >
                    Our <span className="text-p6">Mission</span>
                  </motion.h1>
                  <motion.p
                    className="max-w-440 mb-14 body-1 max-md:mb-10"
                    initial={{ opacity: 0, x: -30 }} // Starts faded out and shifted left
                    animate={{ opacity: 1, x: 0 }} // Moves to its correct position
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} // Slight delay for a staggered effect
                  >
                    Our mission is to support both pregnant women and gynecologists by providing
                    AI-driven tools and insights that enhance prenatal care, improve patient
                    outcomes, and simplify the management of pregnancy-related tasks.
                  </motion.p>
                </motion.div>
              </Grid>
            </Grid>
          </div>
        </Element>
      </section>
      <section className="relative pt-32 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
        <Element name="hero">
          <div className="container">
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              {/* About Text */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }} // Start faded and lower
                  animate={{ opacity: 1, y: 0 }} // Move up and fade in
                  transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                >
                  <motion.h1
                    className="font-poppins mb-6 h2 text-black uppercase max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
                    initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
                    animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                    transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                  >
                    Our{' '}
                    <span className="text-p6" style={{ fontFamily: 'Anton' }}>
                      {' '}
                      Vision
                    </span>
                  </motion.h1>
                  <motion.p
                    className="max-w-440 mb-14 body-1 max-md:mb-10"
                    initial={{ opacity: 0, x: -30 }} // Starts faded out and shifted left
                    animate={{ opacity: 1, x: 0 }} // Moves to its correct position
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} // Slight delay for a staggered effect
                  >
                    To revolutionize pregnancy management and gynecological care by leveraging AI to
                    provide personalized support, improve diagnostic accuracy, and streamline
                    patient management.
                  </motion.p>
                </motion.div>
              </Grid>

              {/* About Image */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }} // Start faded and shifted to the right
                  animate={{ opacity: 1, x: 0 }} // Move to correct position
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src={Vision}
                      alt="23weeks"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </div>
        </Element>
      </section>
      <section className="relative mt-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
        <Element name="hero">
          <div className="container">
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ textAlign: { xs: 'center', md: 'left' } }} // Center text on small screens, left align on larger
            >
              {/* About Text */}
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Start faded and lower
                animate={{ opacity: 1, y: 0 }} // Move up and fade in
                transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
              >
                <motion.h1
                  className="font-poppins mb-6 h2 text-black uppercase max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
                  initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
                  animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                  transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                >
                  Meet Team <span className="text-red-500"> Harissa</span>
                </motion.h1>
              </motion.div>
            </Grid>
            <motion.p
              className="text-center mb-14 body-1 max-md:mb-10"
              initial={{ opacity: 0, y: 50 }} // Starts faded out and shifted left
              animate={{ opacity: 1, y: 0 }} // Moves to its correct position
              transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
            >
              We are a group of passionate Tunisian AI students focused on improving healthcare in
              Africa. Our mission is to develop AI-driven solutions to enhance medical outcomes. We
              aim to advance medical practice and accessibility in the region.
            </motion.p>
            {/* Team Members */}
            <Grid container spacing={4} justifyContent="center">
              {members.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      bgcolor: '#fff',
                      p: 3,
                      borderRadius: '8px',
                      boxShadow: 2,
                      marginBottom: '60px',
                    }}
                  >
                    {/* Image with rounded border and shadow */}
                    <Box
                      component="img"
                      src={member.icon}
                      alt={member.title}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adds shadow to the image
                        mx: 'auto',
                        mb: 2,
                        objectFit: 'cover', // Ensures image fits within its container
                      }}
                    />
                    <motion.h4
                      className="font-poppins text-lg font-semibold text-p6 mt-3 max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
                      initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
                      animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                      transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                    >
                      {member.title}
                    </motion.h4>
                    <motion.h4
                      className="font-poppins text-sm font-medium text-gray-700 mt-3 max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
                      initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
                      animate={{ opacity: 1, y: 0 }} // Moves up and fades in
                      transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
                    >
                      {member.description}
                    </motion.h4>
                    {/* LinkedIn Button */}
                    <IconButton
                      component="a"
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon className="text-p6" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </div>
        </Element>
        <Footer />
      </section>
    </>
  );
};

export default AboutAndMission;

