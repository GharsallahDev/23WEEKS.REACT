import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogContent,
  TextField,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { setCredentials } from '../../store/auth/AuthSlice';
import PageContainer from 'src/components/container/PageContainer';

import epic from 'src/assets/images/logos/epic.png';
import cerner from 'src/assets/images/logos/cerner.png';
import athenahealth from 'src/assets/images/logos/athenahealth.png';

const EHROption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const EHRLogo = styled('img')(({ width, height }) => ({
  width: `${width}px`,
  height: `${height}px`,
  objectFit: 'contain',
  marginBottom: '10px',
  maxWidth: '100%',
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ehrSystems = [
  { name: 'Epic', logo: epic, width: 100, height: 100 },
  { name: 'Cerner', logo: cerner, width: 100, height: 100 },
  { name: 'Athenahealth', logo: athenahealth, width: 100, height: 100 },
];

const DoctorSignupExtra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedEHR, setSelectedEHR] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));
    if (!registrationData) {
      navigate('/auth/register');
    }
  }, [navigate]);

  const handleEHRSelect = (ehr) => {
    setSelectedEHR(ehr);
    setLoginDialogOpen(true);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginStatus('');

    const steps = [
      { message: 'Connecting to server...', duration: 1500 },
      { message: 'Authenticating credentials...', duration: 2000 },
    ];

    for (const step of steps) {
      setLoginStatus(step.message);
      await new Promise((resolve) => setTimeout(resolve, step.duration));
    }

    setLoginStatus('Incorrect credentials or account not found.');
    setIsLoading(false);
  };

  const handleStaticData = () => {
    const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));
    if (registrationData) {
      dispatch(
        setCredentials({
          user: { ...registrationData.user, useStaticData: true },
          token: registrationData.token,
        }),
      );
      navigate('/dashboard/doctor');
    } else {
      navigate('/auth/register');
    }
  };

  return (
    <PageContainer
      title="Connect EHR System"
      description="Choose your EHR system or use static data"
    >
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Connect Your EHR System
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {ehrSystems.map((ehr) => (
            <Grid item xs={12} sm={4} key={ehr.name}>
              <EHROption onClick={() => handleEHRSelect(ehr)}>
                <Box>
                  <EHRLogo
                    src={ehr.logo}
                    alt={`${ehr.name} logo`}
                    width={ehr.width}
                    height={ehr.height}
                  />
                </Box>
                <Typography variant="h6">{ehr.name}</Typography>
              </EHROption>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" fullWidth onClick={handleStaticData} sx={{ mt: 2, py: 2 }}>
              Use Static Data Instead
            </Button>
          </Grid>
        </Grid>
      </Box>

      <AnimatePresence>
        {loginDialogOpen && (
          <Dialog
            open={loginDialogOpen}
            onClose={() => !isLoading && setLoginDialogOpen(false)}
            PaperComponent={motion.div}
            PaperProps={{
              initial: { y: -50, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: -50, opacity: 0 },
            }}
            fullWidth
            maxWidth="sm"
          >
            <DialogContent>
              <LoginCard>
                <EHRLogo
                  src={selectedEHR.logo}
                  alt={`${selectedEHR.name} logo`}
                  width={selectedEHR.width}
                  height={selectedEHR.height}
                />
                <Typography variant="h6">{`Log in to ${selectedEHR.name}`}</Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled={isLoading}
                />
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  disabled={isLoading}
                />
                {loginStatus && (
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    {isLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
                    <Typography color={isLoading ? 'textSecondary' : 'error'}>
                      {loginStatus}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Button onClick={() => setLoginDialogOpen(false)} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button onClick={handleLogin} variant="contained" disabled={isLoading}>
                    Log In
                  </Button>
                </Box>
              </LoginCard>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default DoctorSignupExtra;
