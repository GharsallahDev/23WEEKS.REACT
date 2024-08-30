import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardContent, Grid, Typography, Box, Avatar, Button, Stack, Alert } from '@mui/material';
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { setCredentials } from 'src/store/auth/AuthSlice';
import config from 'src/config';
import user1 from 'src/assets/images/profile/user-1.jpg';
import { useTranslation } from 'react-i18next';

const AccountTab = () => {
    const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user.avatar || user1);
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    email: user.email || '',
  });
  const [alert, setAlert] = useState({ message: '', severity: 'info' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Updated handleAvatarReset to reset the avatar to an empty string
  const handleAvatarReset = () => {
    setAvatar(''); // Reset to empty string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('full_name', formData.full_name);
      formDataToSend.append('email', formData.email);

      // Send empty string for avatar if it was reset
      if (avatar === '') {
        formDataToSend.append('avatar', '');
      } else if (avatar !== user.avatar && avatar !== user1) {
        formDataToSend.append('avatar', dataURItoBlob(avatar), 'avatar.jpg');
      }

      const response = await fetch(`${config.apiUrl}/auth/update-account`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || 'Failed to update account');
      }

      dispatch(
        setCredentials({
          user: {
            ...user,
            full_name: result.full_name,
            email: result.email,
            avatar: result.avatar || user1, // Update avatar or fallback to default
          },
          token: localStorage.getItem('token'),
        }),
      );

      setAlert({ message: 'Account updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating account:', error);
      setAlert({ message: error.message, severity: 'error' });
    }
  };

  // Helper function to convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
      {/* Change Profile */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
             { t('Change Profile')}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              {t('Change your profile picture from here')}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={avatar || user1}
                alt="User Avatar"
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Stack direction="row" spacing={2} mb={2}>
                <Button variant="contained" color="primary" component="label">
                  {t('Upload')}
                  <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                </Button>
                <Button variant="outlined" color="error" onClick={handleAvatarReset}>
                  {t('Reset')}
                </Button>
              </Stack>
              <Typography variant="subtitle1" color="textSecondary">
                {t('Allowed JPG, GIF or PNG. Max size of 800K')}
              </Typography>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {t('Personal Details')}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              {t('To change your personal details, edit and save from here')}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    {t('Your Name')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    {t('Email')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
            {t('Save')}
          </Button>
          <Button size="large" variant="text" color="error">
            {t('Cancel')}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
