import React, { useState } from 'react';
import {
  Avatar,
  Box,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Button,
  Divider,
  Stack,
} from '@mui/material';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons';

const SecurityTab = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event) => {
    event.preventDefault();
    // Implement password change logic here
    console.log('Password change requested');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Stack spacing={3}>
          {/* Password Change Section */}
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Change Password
              </Typography>
              <form onSubmit={handlePasswordChange}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CustomFormLabel htmlFor="current-password">Current Password</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="new-password">New Password</CustomFormLabel>
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
                      Confirm New Password
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Change Password
                </Button>
              </form>
            </CardContent>
          </BlankCard>

          {/* Two-factor Authentication Section */}
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Two-factor Authentication
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente sunt
                  earum officiis laboriosam ut.
                </Typography>
                <Button variant="contained" color="primary">
                  Enable
                </Button>
              </Stack>

              <Divider />

              {/* Authentication App */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Authentication App</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Google auth app
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Setup
                  </Button>
                </Box>
              </Stack>
              <Divider />

              {/* Another e-mail */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Another e-mail</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    E-mail to send verification link
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Setup
                  </Button>
                </Box>
              </Stack>
              <Divider />

              {/* SMS Recovery */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">SMS Recovery</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Your phone number or something
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Setup
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Stack>
      </Grid>

      {/* Devices Section */}
      <Grid item xs={12} lg={4}>
        <BlankCard>
          <CardContent>
            <Avatar
              variant="rounded"
              sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}
            >
              <IconDeviceLaptop size="26" />
            </Avatar>

            <Typography variant="h5" mt={2}>
              Devices
            </Typography>
            <Typography color="textSecondary" mt={1} mb={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
            </Typography>
            <Button variant="contained" color="primary">
              Sign out from all devices
            </Button>

            {/* iPhone 14 */}
            <Stack direction="row" spacing={2} py={2} mt={3} alignItems="center">
              <IconDeviceMobile size="26" />
              <Box>
                <Typography variant="h6">iPhone 14</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  London UK, Oct 23 at 1:15 AM
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <IconButton>
                  <IconDotsVertical size="22" />
                </IconButton>
              </Box>
            </Stack>
            <Divider />

            {/* Macbook Air */}
            <Stack direction="row" spacing={2} py={2} alignItems="center">
              <IconDeviceLaptop size="26" />
              <Box>
                <Typography variant="h6">Macbook Air </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Gujarat India, Oct 24 at 3:15 AM
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <IconButton>
                  <IconDotsVertical size="22" />
                </IconButton>
              </Box>
            </Stack>
            <Stack>
              <Button variant="text" color="primary">
                Need Help ?
              </Button>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Save and Cancel Buttons */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            Save
          </Button>
          <Button size="large" variant="text" color="error">
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SecurityTab;
