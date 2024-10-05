import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { differenceInMonths, isValid, isPast } from 'date-fns';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { setCredentials } from '../../store/auth/AuthSlice';
import PageContainer from 'src/components/container/PageContainer';
import config from 'src/config';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

const validationSchema = yup.object({
  pregnancyStartDate: yup
    .date()
    .nullable()
    .required('Pregnancy Start Date is required')
    .test('is-valid-date', 'Invalid date', (value) => value === null || isValid(value))
    .test('is-not-future', 'Pregnancy Start Date cannot be in the future', (value) => {
      if (!value) return true;
      return isPast(value);
    })
    .test('is-not-too-old', 'Pregnancy Start Date cannot be more than 9 months ago', (value) => {
      if (!value) return true;
      const today = new Date();
      return differenceInMonths(today, value) <= 9;
    }),
  gynecologistId: yup.number().nullable(),
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
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/doctor_list`);
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error('Failed to fetch doctors');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const formik = useFormik({
    initialValues: {
      pregnancyStartDate: null,
      gynecologistId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));

      try {
        if (!values.pregnancyStartDate) {
          throw new Error('Pregnancy Start Date is required');
        }

        const formattedDate = values.pregnancyStartDate.toISOString().split('T')[0];

        const response = await fetch(`${config.apiUrl}/auth/register/patient-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${registrationData.token}`,
          },
          body: JSON.stringify({
            pregnancy_start_date: formattedDate,
            gynecologist_id: values.gynecologistId || null,
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
        formik.setErrors({ submit: err.message || 'An error occurred. Please try again.' });
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Pregnancy Start Date"
                value={formik.values.pregnancyStartDate}
                onChange={(date) => formik.setFieldValue('pregnancyStartDate', date)}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.pregnancyStartDate && Boolean(formik.errors.pregnancyStartDate)
                    }
                    helperText={
                      formik.touched.pregnancyStartDate && formik.errors.pregnancyStartDate
                    }
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    onClick={params.inputProps.onClick}
                  />
                )}
                maxDate={new Date()} // This ensures no future dates can be selected
              />
            </LocalizationProvider>

            <FormControl fullWidth margin="normal">
              <InputLabel id="gynecologist-label">Gynecologist</InputLabel>
              <Select
                labelId="gynecologist-label"
                id="gynecologistId"
                name="gynecologistId"
                value={formik.values.gynecologistId}
                onChange={formik.handleChange}
                label="Gynecologist"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {formik.errors.submit && (
              <Typography color="error" variant="body2">
                {formik.errors.submit}
              </Typography>
            )}

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
