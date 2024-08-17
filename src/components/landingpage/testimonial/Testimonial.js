import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Expectant Mother',
    content: 'PrenatAI has been a lifesaver during my pregnancy. The 24/7 support and personalized advice have given me peace of mind.',
    avatar: '/path/to/avatar1.jpg',
  },
  {
    name: 'Dr. Emily Chen',
    role: 'Gynecologist',
    content: 'The AI-enhanced imaging has significantly improved my diagnostic accuracy. It\'s a game-changer for prenatal care.',
    avatar: '/path/to/avatar2.jpg',
  },
  {
    name: 'Michael Brown',
    role: 'Partner',
    content: 'As a first-time dad, the educational resources and reminders have helped me support my partner throughout her pregnancy.',
    avatar: '/path/to/avatar3.jpg',
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 2, flexGrow: 1 }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={testimonial.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;