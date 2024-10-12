import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, Paper,Card, Grid, CardContent } from '@mui/material';
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

  const [errors, setErrors] = useState({});
  const [predictionText, setPredictionText] = useState('');

  const validateForm = () => {
    const newErrors = {};
    let hasError = false;
    
    if (formData.age < 10 || formData.age > 70) {
      newErrors.age = 'Age must be between 10 and 70';
      hasError = true;
    }
    if (formData.systolic_bp < 70 || formData.systolic_bp > 160) {
      newErrors.systolic_bp = 'Systolic BP must be between 70 and 160';
      hasError = true;
    }
    if (formData.diastolic_bp < 49 || formData.diastolic_bp > 100) {
      newErrors.diastolic_bp = 'Diastolic BP must be between 49 and 100';
      hasError = true;
    }
    if (formData.bs < 6.0 || formData.bs > 19.0) {
      newErrors.bs = 'Blood Glucose Level must be between 6.0 and 19.0';
      hasError = true;
    }
    if (formData.bt < 98.0 || formData.bt > 103.0) {
      newErrors.bt = 'Body Temperature must be between 98.0 and 103.0';
      hasError = true;
    }
    if (formData.heart_rate < 70 || formData.heart_rate > 90) {
      newErrors.heart_rate = 'Heart Rate must be between 7 and 90';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setPredictionText('Serious case');
      return;
    }

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
  const InformationCard = styled(Card)({
    marginTop: 24,
    backgroundColor: 'primary.light',
  });
  return (
    <PageContainer title="Health Tracking">
      <Breadcrumb title="Health Tracking" items={BCrumb}>
        <Box sx={{ marginTop: '-15px' }}>
          <img src={breadcrumbImg} alt="Health Tracking" width="155px" />
        </Box>
      </Breadcrumb>
      <Grid item xs={12}>
  <InformationCard>
    <CardContent>
      <Typography sx={{ color: '#dd1367' }} variant="h6" gutterBottom>
        Health Tracking and Risk Prediction
      </Typography>
      <Typography variant="body1" paragraph>
        The health tracking feature monitors key vital signs provided by doctors to assess the risk level during pregnancy. By analyzing these inputs, the system predicts whether the pregnancy is high-risk or low-risk, enabling early intervention when necessary. This proactive approach ensures that both the mother and baby receive appropriate care, supporting safer pregnancies and improved outcomes.
      </Typography>
    </CardContent>
  </InformationCard>
</Grid>

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
              error={!!errors.age}
              helperText={errors.age}
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
              error={!!errors.systolic_bp}
              helperText={errors.systolic_bp}
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
              error={!!errors.diastolic_bp}
              helperText={errors.diastolic_bp}
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
              error={!!errors.bs}
              helperText={errors.bs}
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
              error={!!errors.bt}
              helperText={errors.bt}
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
              error={!!errors.heart_rate}
              helperText={errors.heart_rate}
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
