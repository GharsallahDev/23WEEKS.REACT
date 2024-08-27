import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Button, styled } from '@mui/material';
import Header from 'src/components/landingpage/header/Header';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import NadiaImage from '../../../assets/images/profile/NADIA.jpg';
import EyaImage from '../../../assets/images/profile/EYA.jpg';
import MalekImage from '../../../assets/images/profile/MALEK.jpg';
import NourImage from '../../../assets/images/profile/NOUR.jpg';
import CallToAction from 'src/components/landingpage/CallToAction';
import Footer from 'src/components/landingpage/footer/Footer';
import AnimateFadeIn from 'src/components/landingpage/animation/Animation';

const AnimatedSection = ({ children, delay = 0 }) => (
  <AnimateFadeIn>
    <Box sx={{ opacity: 0, animation: `fadeIn 0.5s ease-out ${delay}s forwards` }}>{children}</Box>
  </AnimateFadeIn>
);
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '70%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
  padding: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const SocialMediaButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const TitleWithIcon = ({ icon: Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
    <Icon sx={{ color: '#dd1367', mr: 2 }} />
    <Typography variant="h4" align="center" sx={{ color: '#dd1367' }}>
      {text}
    </Typography>
  </Box>
);

const AboutUs = () => {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="lg">
        <Typography sx={{ py: 8, color: '#dd1367' }} variant="h1" align="center" gutterBottom>
          About Us
        </Typography>

        <TitleWithIcon icon={InfoIcon} text="23Weeks" />
        <Typography variant="body1" align="center" paragraph>
          23WEEKS simplifies the pregnancy journey for parents and boosts gynecological care with AI to enhance patient management and diagnostics.
        </Typography>

        <TitleWithIcon icon={EmojiObjectsIcon} text="Our Vision" />
        <Typography variant="body1" align="center" paragraph>
          To revolutionize pregnancy management and gynecological care by leveraging AI to provide personalized support, improve diagnostic accuracy, and streamline patient management.
        </Typography>

        <TitleWithIcon icon={GroupIcon} text="Meet Team Harissa" />
        <Typography variant="body1" align="center" paragraph>
          We are a group of passionate Tunisian AI students focused on improving healthcare in Africa. Our mission is to develop AI-driven solutions to enhance medical outcomes. We aim to advance medical practice and accessibility in the region.
        </Typography>
        <Typography sx={{ py: 8 }} variant="h1" align="center" gutterBottom>
        
        </Typography>
        <Grid container spacing={10} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={6}>
            <TeamMemberCard>
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={NadiaImage} />
              <CardContentStyled>
                <Typography variant="h6">Nadia Trabelsi</Typography>
                <Typography variant="body2" color="text.secondary">
                  AI Engineer
                </Typography>
              </CardContentStyled>
            </TeamMemberCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TeamMemberCard>
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={EyaImage} />
              <CardContentStyled>
                <Typography variant="h6">Eya Ben Moulehem</Typography>
                <Typography variant="body2" color="text.secondary">
                  AI Engineer
                </Typography>
              </CardContentStyled>
            </TeamMemberCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TeamMemberCard>
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={MalekImage} />
              <CardContentStyled>
                <Typography variant="h6">Malek Gharsallah</Typography>
                <Typography variant="body2" color="text.secondary">
                  AI Engineer
                </Typography>
              </CardContentStyled>
            </TeamMemberCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TeamMemberCard>
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={NourImage} />
              <CardContentStyled>
                <Typography variant="h6">Nour Ben Ammar</Typography>
                <Typography variant="body2" color="text.secondary">
                  AI Engineer
                </Typography>
              </CardContentStyled>
            </TeamMemberCard>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" gutterBottom>
          Follow Us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SocialMediaButton variant="outlined" color="primary" startIcon={<FacebookIcon />} href="https://www.facebook.com/profile.php?id=61564761629073&locale=fr_FR" target="_blank">
            Facebook
          </SocialMediaButton>
          <SocialMediaButton variant="outlined" color="primary" startIcon={<InstagramIcon />} href="https://www.instagram.com/twenty3weeks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
            Instagram
          </SocialMediaButton>
          
        </Box>
      </Container>
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

export default AboutUs;
