import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Button, Stack, MenuItem } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomSelect from '../../components/forms/theme-elements/CustomSelect';
import { setCredentials } from '../../store/auth/AuthSlice';
import PageContainer from 'src/components/container/PageContainer';

const validationSchema = yup.object({
  pregnancyStage: yup.string().required('Pregnancy stage is required'),
  dueDate: yup.date().required('Due date is required'),
  previousPregnancies: yup.number().required('Number of previous pregnancies is required').min(0),
});

const PatientSignupExtra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      pregnancyStage: '',
      dueDate: '',
      previousPregnancies: '',
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

      navigate('/dashboards/woman');
    },
  });

  const pregnancyStages = [
    { value: 'first_trimester', label: 'First Trimester' },
    { value: 'second_trimester', label: 'Second Trimester' },
    { value: 'third_trimester', label: 'Third Trimester' },
  ];

  return (
    <PageContainer
      title="Patient Sign Up"
      description="Additional information for patient registration"
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={3}>
          Pregnancy Information
        </Typography>
        <Stack spacing={3}>
          <CustomSelect
            fullWidth
            id="pregnancyStage"
            name="pregnancyStage"
            label="Pregnancy Stage"
            value={formik.values.pregnancyStage}
            onChange={formik.handleChange}
            error={formik.touched.pregnancyStage && Boolean(formik.errors.pregnancyStage)}
          >
            {pregnancyStages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomTextField
            fullWidth
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
          />
          <CustomTextField
            fullWidth
            id="previousPregnancies"
            name="previousPregnancies"
            label="Number of Previous Pregnancies"
            type="number"
            value={formik.values.previousPregnancies}
            onChange={formik.handleChange}
            error={formik.touched.previousPregnancies && Boolean(formik.errors.previousPregnancies)}
            helperText={formik.touched.previousPregnancies && formik.errors.previousPregnancies}
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

export default PatientSignupExtra;
