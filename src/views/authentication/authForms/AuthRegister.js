import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Typography, Button, Divider, Alert, MenuItem, Stack } from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

import config from 'src/config';
import ErrorBoundary from '../../../utils/ErrorBoundary';

const validationSchema = yup.object({
  type: yup.string().required('Type is required'),
  full_name: yup
    .string()
    .min(2, 'Full name should be at least 2 characters')
    .required('Full name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      type: '',
      full_name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(`${config.apiUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem(
            'registrationData',
            JSON.stringify({
              user: { type: values.type, full_name: values.full_name, email: values.email },
              token: data.access_token,
            }),
          );
          if (values.type === 'doctor') {
            navigate('/auth/register/doctor-info');
          } else {
            navigate('/auth/register/patient-info');
          }
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.msg || 'An error occurred during registration.' });
        }
      } catch (err) {
        setErrors({ submit: 'An error occurred. Please try again.' });
        console.error('Registration error:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const types = [
    { value: 'user', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
  ];

  return (
    <ErrorBoundary>
      <form onSubmit={formik.handleSubmit}>
        {title && (
          <Typography fontWeight="700" variant="h3" mb={1}>
            {title}
          </Typography>
        )}
        {subtext}
        <Box mt={3}>
          <Divider>
            <Typography
              component="span"
              color="textSecondary"
              variant="h6"
              fontWeight="400"
              position="relative"
              px={2}
            >
              Sign Up
            </Typography>
          </Divider>
        </Box>
        {formik.errors.submit && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formik.errors.submit}
          </Alert>
        )}
        <Box>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="type" required>
              Select Type <span style={{ color: 'red' }}>*</span>
            </CustomFormLabel>
            <CustomSelect
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              fullWidth
              variant="outlined"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
            {formik.touched.type && formik.errors.type && (
              <Typography color="error" variant="caption">
                {formik.errors.type}
              </Typography>
            )}
            <CustomFormLabel htmlFor="full_name" required>
              Full Name <span style={{ color: 'red' }}>*</span>
            </CustomFormLabel>
            <CustomTextField
              id="full_name"
              name="full_name"
              variant="outlined"
              fullWidth
              value={formik.values.full_name}
              onChange={formik.handleChange}
              error={formik.touched.full_name && Boolean(formik.errors.full_name)}
              helperText={formik.touched.full_name && formik.errors.full_name}
            />
            <CustomFormLabel htmlFor="email" required>
              Email Address <span style={{ color: 'red' }}>*</span>
            </CustomFormLabel>
            <CustomTextField
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <CustomFormLabel htmlFor="password" required>
              Password <span style={{ color: 'red' }}>*</span>
            </CustomFormLabel>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing Up...' : 'Next'}
          </Button>
        </Box>
        {subtitle}
      </form>
    </ErrorBoundary>
  );
};

export default AuthRegister;