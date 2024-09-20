import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Button, TextField, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setCredentials } from '../../store/auth/AuthSlice';
import PageContainer from 'src/components/container/PageContainer';
import config from 'src/config';

const validationSchema = yup.object({
  pregnancyStartDate: yup.date().required('Pregnancy Start Date is required'),
});

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

const PatientSignupExtra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      pregnancyStartDate: new Date().toISOString().split('T')[0],
    },
    validationSchema,
    onSubmit: async (values) => {
      const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));

      try {
        const response = await fetch(`${config.apiUrl}/auth/register/patient-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${registrationData.token}`,
          },
          body: JSON.stringify({
            pregnancy_start_date: values.pregnancyStartDate,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const updatedUserData = {
            ...registrationData.user,
            ...data.user,
          };

          dispatch(
            setCredentials({
              user: updatedUserData,
              token: registrationData.token,
            }),
          );

          navigate('/dashboard/woman');
        } else {
          const errorData = await response.json();
          formik.setErrors({ submit: errorData.msg || 'An error occurred during registration.' });
        }
      } catch (err) {
        formik.setErrors({ submit: 'An error occurred. Please try again.' });
        console.error('Registration error:', err);
      }
    },
  });

  return (
    <PageContainer
      title="Patient Sign Up"
      description="Additional information for patient registration"
    >
      <StyledContainer>
        <StyledPaper>
          <Typography variant="h5" align="center" mb={3}>
            Pregnancy Information
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="pregnancyStartDate"
              name="pregnancyStartDate"
              label="Pregnancy Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.pregnancyStartDate}
              onChange={formik.handleChange}
              error={formik.touched.pregnancyStartDate && Boolean(formik.errors.pregnancyStartDate)}
              helperText={formik.touched.pregnancyStartDate && formik.errors.pregnancyStartDate}
              margin="normal"
            />

            <Box mt={3}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Complete Registration
              </Button>
            </Box>
          </form>
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default PatientSignupExtra;