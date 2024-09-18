import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Button, TextField, MenuItem, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setCredentials } from '../../store/auth/AuthSlice';
import PageContainer from 'src/components/container/PageContainer';

const validationSchema = yup.object({
  pregnancyStage: yup.string().required('Pregnancy stage is required'),
  dueDate: yup.date().required('Pregnancy Date is required'),
});

// Styled components for consistency
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

const DoctorSignupExtra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      pregnancyStage: '',
      dueDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));
      const updatedUserData = { ...registrationData.user, ...values };

      dispatch(
        setCredentials({
          user: updatedUserData,
          token: registrationData.token,
        }),
      );

      navigate('/dashboard/woman');
    },
  });

  const pregnancyStages = [
    { value: 'first_trimester', label: 'First Trimester' },
    { value: 'second_trimester', label: 'Second Trimester' },
    { value: 'third_trimester', label: 'Third Trimester' },
  ];

  return (
    <PageContainer title="Patient Sign Up" description="Additional information for patient registration">
      <StyledContainer>
        <StyledPaper>
          <Typography variant="h5" align="center" mb={3}>
            Pregnancy Information
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              select
              label="Pregnancy Stage"
              name="pregnancyStage"
              value={formik.values.pregnancyStage}
              onChange={formik.handleChange}
              error={formik.touched.pregnancyStage && Boolean(formik.errors.pregnancyStage)}
              helperText={formik.touched.pregnancyStage && formik.errors.pregnancyStage}
              fullWidth
              margin="normal"
            >
              {pregnancyStages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              id="dueDate"
              name="dueDate"
              label="Pregnancy Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
              helperText={formik.touched.dueDate && formik.errors.dueDate}
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

export default DoctorSignupExtra;
