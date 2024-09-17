import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Button, Stack } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { setCredentials } from '../../store/auth/AuthSlice';
import PageContainer from 'src/components/container/PageContainer';

const validationSchema = yup.object({
  specialization: yup.string().required('Specialization is required'),
  licenseNumber: yup.string().required('License number is required'),
  yearsOfExperience: yup.number().required('Years of experience is required').positive().integer(),
});

const DoctorSignupExtra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      specialization: '',
      licenseNumber: '',
      yearsOfExperience: '',
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

      navigate('/dashboards/doctor');
    },
  });

  return (
    <PageContainer
      title="Doctor Sign Up"
      description="Additional information for doctor registration"
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={3}>
          Doctor Information
        </Typography>
        <Stack spacing={3}>
          <CustomTextField
            fullWidth
            id="specialization"
            name="specialization"
            label="Specialization"
            value={formik.values.specialization}
            onChange={formik.handleChange}
            error={formik.touched.specialization && Boolean(formik.errors.specialization)}
            helperText={formik.touched.specialization && formik.errors.specialization}
          />
          <CustomTextField
            fullWidth
            id="licenseNumber"
            name="licenseNumber"
            label="License Number"
            value={formik.values.licenseNumber}
            onChange={formik.handleChange}
            error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
            helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
          />
          <CustomTextField
            fullWidth
            id="yearsOfExperience"
            name="yearsOfExperience"
            label="Years of Experience"
            type="number"
            value={formik.values.yearsOfExperience}
            onChange={formik.handleChange}
            error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
            helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
          />
        </Stack>
        <Box mt={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Complete Registration
          </Button>
        </Box>
      </form>
    </PageContainer>
  );
};

export default DoctorSignupExtra;
