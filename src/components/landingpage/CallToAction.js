import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h2" gutterBottom>
              Ready to Transform Your Prenatal Care Experience?
            </Typography>
            <Typography variant="h6" paragraph>
              Join thousands of expectant mothers and healthcare providers benefiting from
              AI-powered support and diagnostics.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/register"
              fullWidth
            >
              Get Started Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToAction;