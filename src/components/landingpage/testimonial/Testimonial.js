import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Dr. Ahmed Souki',
    role: 'Gynecologist',
    content: '23Weeks has been an invaluable tool in my practice. The advanced features for monitoring and reporting have significantly improved my ability to provide top-notch care to my patients.',
    avatar: '/path/to/dr-ahmed-souki.jpg', 
  },
  {
    name: 'Dr. Zied Kammoun',
    role: 'Gynecologist and Expert Partner',
    content: 'I am truly impressed with the 23Weeks solution. Its comprehensive approach to prenatal care is unmatched, and I’m proud to partner with such an innovative solution.',
    avatar: '/path/to/dr-zied-kammoun.jpg', 
  },
  {
    name: 'Amina Diallo',
    role: 'Expectant Mother',
    content: '23Weeks has been a blessing throughout my pregnancy. The personalized care plans and symptom tracking have provided me with much-needed support and reassurance.',
    avatar: '/path/to/amina-diallo.jpg',
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
