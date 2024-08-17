import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  ListItemIcon,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

import { IconCheck, IconX } from '@tabler/icons';
import BlankCard from '../shared/BlankCard';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import pck1 from 'src/assets/images/backgrounds/silver.png';
import pck2 from 'src/assets/images/backgrounds/bronze.png';
import pck3 from 'src/assets/images/backgrounds/gold.png';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const PackageTypography = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

const StyledBlankCard = styled(BlankCard)({
  height: '100%', // Ensure the card takes full height of its container
  display: 'flex',
  flexDirection: 'column',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1, // Allow the content to grow and fill the card
  display: 'flex',
  flexDirection: 'column',
});

const pricingPlans = {
  women: [
    {
      id: 1,
      package: 'Basic',
      monthlyplan: 0,
      yearlyplan: 0,
      avatar: pck1,
      badge: false,
      btntext: 'Choose Basic',
      rules: [
        { limit: true, title: 'Chat (limited)' },
        { limit: true, title: 'Basic smart reminders' },
        { limit: true, title: 'Access to selected blog articles' },
        { limit: true, title: 'Simple search functionality' },
        { limit: false, title: 'Personalized story generation' },
      ],
    },
    {
      id: 2,
      package: 'Advanced',
      monthlyplan: 9.99,
      yearlyplan: 99.99,
      avatar: pck2,
      badge: true,
      btntext: 'Choose Advanced',
      rules: [
        { limit: true, title: 'Unlimited chat' },
        { limit: true, title: 'Comprehensive smart reminders' },
        { limit: true, title: 'Full access to blog content' },
        { limit: true, title: 'Enhanced search engine' },
        { limit: true, title: 'Baby name generation' },
      ],
    },
    {
      id: 3,
      package: 'Premium',
      monthlyplan: 19.99,
      yearlyplan: 199.99,
      avatar: pck3,
      badge: false,
      btntext: 'Choose Premium',
      rules: [
        { limit: true, title: 'Personalized story generation with voice generation' },
        { limit: true, title: 'Priority support' },
        { limit: true, title: 'Integration with health tracking devices' },
      ],
    },
  ],
  gynecologists: [
    {
      id: 1,
      package: 'Basic',
      monthlyplan: 49.99,
      yearlyplan: 499.99,
      avatar: pck1,
      badge: false,
      btntext: 'Choose Basic',
      rules: [
        { limit: true, title: 'Ultrasound quality enhancing (limited use)' },
        { limit: true, title: 'Basic ultrasound report generation' },
        { limit: true, title: 'Health tracking (basic metrics)' },
        { limit: false, title: 'Anomaly detection' },
        { limit: false, title: 'Integration with other medical systems' },
      ],
    },
    {
      id: 2,
      package: 'Advanced',
      monthlyplan: 99.99,
      yearlyplan: 999.99,
      avatar: pck2,
      badge: true,
      btntext: 'Choose Advanced',
      rules: [
        { limit: true, title: 'Unlimited ultrasound quality enhancing' },
        { limit: true, title: 'Advanced ultrasound report generation' },
        { limit: true, title: 'Ultrasound classification' },
        { limit: true, title: 'Head circumference calculation' },
        { limit: true, title: 'Enhanced health tracking' },
      ],
    },
    {
      id: 3,
      package: 'Premium',
      monthlyplan: 149.99,
      yearlyplan: 1499.99,
      avatar: pck3,
      badge: false,
      btntext: 'Choose Premium',
      rules: [
        { limit: true, title: 'Anomaly detection' },
        { limit: true, title: 'Priority support' },
        { limit: true, title: 'Advanced analytics and insights' },
        { limit: true, title: 'Integration with other medical systems' },
        { limit: true, title: 'All Advanced features' },
      ],
    },
  ],
};

const Pricing = () => {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState('women');

  const handleUserTypeChange = (event, newUserType) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Grid container spacing={3} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} lg={8} textAlign="center">
          <Typography variant="h2" gutterBottom>
            Flexible Plans Tailored to Fit Your Needs!
          </Typography>
          <StyledToggleButtonGroup
            value={userType}
            exclusive
            onChange={handleUserTypeChange}
            aria-label="user type"
          >
            <StyledToggleButton value="women" aria-label="pregnant women">
              <PregnantWomanIcon sx={{ mr: 1 }} /> Pregnant Women
            </StyledToggleButton>
            <StyledToggleButton value="gynecologists" aria-label="gynecologists">
              <LocalHospitalIcon sx={{ mr: 1 }} /> Gynecologists
            </StyledToggleButton>
          </StyledToggleButtonGroup>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="subtitle1">Monthly</Typography>
            <Switch onChange={() => setShow(!show)} />
            <Typography variant="subtitle1">Yearly</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={5}>
        {pricingPlans[userType].map((price, i) => (
          <Grid item xs={12} lg={4} sm={6} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ height: '100%' }} // Ensure the motion div takes full height
            >
              <StyledBlankCard>
                <StyledCardContent>
                  <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <img src={price.avatar} alt={price.package} width={90} />
                    <PackageTypography>{price.package}</PackageTypography>
                  </Box>
                  <Box my={4}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Typography variant="h6" mr="8px">
                        $
                      </Typography>
                      <Typography fontSize="48px" fontWeight="600">
                        {show ? price.yearlyplan : price.monthlyplan}
                      </Typography>
                      <Typography
                        fontSize="15px"
                        fontWeight={400}
                        ml={1}
                        color="textSecondary"
                        mt={1}
                      >
                        /{show ? 'yr' : 'mo'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt={3} flexGrow={1}>
                    {' '}
                    {/* Allow this box to grow and push the button to the bottom */}
                    <List>
                      {price.rules.map((rule, i) => (
                        <ListItem disableGutters key={i}>
                          <ListItemIcon
                            sx={{
                              color: rule.limit ? 'primary.main' : 'grey.400',
                              minWidth: '32px',
                            }}
                          >
                            {rule.limit ? <IconCheck width={18} /> : <IconX width={18} />}
                          </ListItemIcon>
                          <ListItemText
                            primary={rule.title}
                            sx={{ color: rule.limit ? 'inherit' : 'grey.400' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Button
                    sx={{ width: '100%', mt: 3 }}
                    variant="contained"
                    size="large"
                  >
                    {price.btntext}
                  </Button>
                </StyledCardContent>
              </StyledBlankCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;
