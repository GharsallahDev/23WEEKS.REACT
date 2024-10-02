import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

import { setCredentials } from '../../../store/auth/AuthSlice';

import config from 'src/config';
import ErrorBoundary from '../../../utils/ErrorBoundary';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await fetch(`${config.apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();

          const userData = {
            id: data.id,
            full_name: data.full_name,
            email: data.email,
            type: data.type,
            avatar: data.avatar,
            current_pregnancy_week: data.current_pregnancy_week,
            pregnancy_info: data.pregnancy_info,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };

          dispatch(
            setCredentials({
              user: userData,
              token: data.access_token,
            }),
          );

          if (data.type === 'doctor') {
            navigate('/dashboard/doctor');
          } else {
            navigate('/dashboard/woman');
          }
        } else {
          const errorData = await response.json();
          formik.setErrors({ submit: errorData.msg || 'An error occurred during login.' });
        }
      } catch (err) {
        formik.setErrors({ submit: 'An error occurred. Please try again.' });
        console.error('Login error:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ErrorBoundary>
      {' '}
      {/* Wrap the form with ErrorBoundary */}
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
              Login
            </Typography>
          </Divider>
        </Box>
        {formik.errors.submit && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formik.errors.submit}
          </Alert>
        )}
        <Stack spacing={3}>
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
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox id="remember_me" name="remember_me" color="primary" />}
              label="Remember me"
            />
          </FormGroup>
        </Stack>
        <Box mt={2}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging In...' : 'Login'}
          </Button>
        </Box>
        {subtitle}
      </form>
    </ErrorBoundary>
  );
};

export default AuthLogin;
