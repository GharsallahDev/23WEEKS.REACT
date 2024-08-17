import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              23 Weeks
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revolutionizing prenatal care with AI-powered solutions for expectant mothers and
              healthcare providers.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Link href="/about" color="inherit" display="block">
              About Us
            </Link>
            <Link href="/team" color="inherit" display="block">
              Our Team
            </Link>
            <Link href="/careers" color="inherit" display="block">
              Careers
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="/blog" color="inherit" display="block">
              Blog
            </Link>
            <Link href="/faq" color="inherit" display="block">
              FAQ
            </Link>
            <Link href="/support" color="inherit" display="block">
              Support
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="/privacy" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect
            </Typography>
            <Link href="https://facebook.com" color="inherit" display="block">
              Facebook
            </Link>
            <Link href="https://twitter.com" color="inherit" display="block">
              Twitter
            </Link>
            <Link href="https://linkedin.com" color="inherit" display="block">
              LinkedIn
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} 23 Weeks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;