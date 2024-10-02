import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardContent, Grid, Typography, Box, Button, Stack, Alert } from '@mui/material';
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { setCredentials } from 'src/store/auth/AuthSlice';
import config from 'src/config';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';

const PregnancyTab = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    pregnancy_start_date: user.pregnancy_info?.pregnancy_start_date
      ? new Date(user.pregnancy_info.pregnancy_start_date)
      : null,
    gynecologist_id: user.pregnancy_info?.gynecologist?.id || '',
  });

  const [alert, setAlert] = useState({ message: '', severity: 'info' });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      pregnancy_start_date: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        pregnancy_start_date: formData.pregnancy_start_date
          ? formData.pregnancy_start_date.toISOString()
          : null,
      };

      const response = await fetch(`${config.apiUrl}/auth/update-pregnancy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || 'Failed to update pregnancy information');
      }

      dispatch(
        setCredentials({
          user: {
            ...user,
            pregnancy_info: {
              ...user.pregnancy_info,
              gynecologist: {
                id: formData.gynecologist_id,
                full_name:
                  doctors.find((doc) => doc.id === formData.gynecologist_id)?.full_name || null,
                avatar: null,
              },
              pregnancy_start_date:
                result.pregnancy_start_date || user.pregnancy_info.pregnancy_start_date,
            },
          },
          token: localStorage.getItem('token'),
        }),
      );

      setAlert({ message: 'Pregnancy information updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating pregnancy information:', error);
      setAlert({ message: error.message, severity: 'error' });
    }
  };

  return (
    <Grid container spacing={3}>
      {alert.message && (
        <Grid item xs={12}>
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: 'info' })}
          >
            {alert.message}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {t('Pregnancy Information')}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              {t('Update your pregnancy details here')}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="pregnancy-start-date">
                    {t('Pregnancy Start Date')}
                  </CustomFormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={formData.pregnancy_start_date}
                      onChange={handleDateChange}
                      renderInput={(params) => <CustomTextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="gynecologist">{t('Gynecologist')}</CustomFormLabel>
                  <CustomTextField
                    select
                    id="gynecologist"
                    name="gynecologist_id"
                    value={formData.gynecologist_id}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>{t('None')}</em>
                    </MenuItem>
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.full_name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  {t('Save Changes')}
                </Button>
              </Box>
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default PregnancyTab;
