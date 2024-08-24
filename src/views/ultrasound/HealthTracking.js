import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/trackers-fitness-au-design-plat.png';
import config from 'src/config';

const BCrumb = [
  {
    to: '/',
    title: 'Pregnant Women Health',
  },
  {
    title: 'Health Tracking',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 600,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const HealthTracking = () => {
  const [formData, setFormData] = useState({
    age: '',
    systolic_bp: '',
    diastolic_bp: '',
    bs: '',
    bt: '',
    heart_rate: ''
  });
  const [predictionText, setPredictionText] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }
  
        const response = await fetch(`${config.apiUrl}/api/health-tracking`, {
            method: 'POST',
            body: formDataObj
        });
  
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error:', errorText);
            setPredictionText('Error: ' + errorText);
            return;
        }
  
        const result = await response.json();
        if (result.error) {
            setPredictionText('Error: ' + result.error);
        } else {
            setPredictionText(result.risk_level);
        }
    } catch (error) {
        console.error('Error:', error);
        setPredictionText('An error occurred while fetching the prediction.');
    }
  };

  return (
    <PageContainer title="Health Tracking">
      <Breadcrumb title="Tracking" items={BCrumb}>
        <Box sx={{ marginTop: '-15px' }}>
          <img src={breadcrumbImg} alt="Health Tracking" width="155px" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <Typography variant="h5" align="center">
            Pregnancy Risk Prediction
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Systolic Blood Pressure (mmHg)"
              name="systolic_bp"
              type="number"
              value={formData.systolic_bp}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Diastolic Blood Pressure (mmHg)"
              name="diastolic_bp"
              type="number"
              value={formData.diastolic_bp}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Blood Glucose Level (mmol/L)"
              name="bs"
              type="number"
              value={formData.bs}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Body Temperature (°F)"
              name="bt"
              type="number"
              value={formData.bt}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Heart Rate (bpm)"
              name="heart_rate"
              type="number"
              value={formData.heart_rate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Predict
            </Button>
          </form>
          {predictionText && (
            <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
              {predictionText}
            </Typography>
          )}
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default HealthTracking;
