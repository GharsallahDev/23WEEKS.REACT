import React, { useState } from 'react';
import { Grid, Typography, Button, Stack, CardContent, Alert } from '@mui/material';
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { useTranslation } from 'react-i18next';
import config from 'src/config'; // Make sure to import your API config

const SecurityTab = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', severity: 'info' });

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    // Validate the new password and confirm password
    if (newPassword !== confirmPassword) {
      setAlert({ message: t('New password and confirm password do not match'), severity: 'error' });
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/auth/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || t('Failed to update password'));
      }

      setAlert({ message: t('Password updated successfully'), severity: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
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
              {t('Change Password')}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              {t('Update your password from here')}
            </Typography>
            <form onSubmit={handlePasswordChange}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="current-password">
                    {t('Current Password')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="current-password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="new-password">{t('New Password')}</CustomFormLabel>
                  <CustomTextField
                    id="new-password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="confirm-password">
                    {t('Confirm New Password')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="confirm-password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }} mt={3}>
                <Button size="large" type="submit" variant="contained" color="primary">
                  {t('Save')}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default SecurityTab;