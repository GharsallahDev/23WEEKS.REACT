import * as React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import AccountTab from '../../../components/pages/account-setting/AccountTab';
import SecurityTab from '../../../components/pages/account-setting/SecurityTab';
import PregnancyTab from '../../../components/pages/account-setting/PregnancyTab';
import { IconBell, IconLock, IconUserCircle, IconBabyCarriage } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import { useSelector } from 'react-redux';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Account Setting',
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AccountSetting = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.auth.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Account Setting" description="this is Account Setting page">
      {/* breadcrumb */}
      <Breadcrumb title="Account Setting" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
              <Tabs
                value={value}
                onChange={handleChange}
                scrollButtons="auto"
                aria-label="basic tabs example"
                variant="scrollable"
              >
                <Tab
                  iconPosition="start"
                  icon={<IconUserCircle size="22" />}
                  label={t('Account')}
                  {...a11yProps(0)}
                />
                {/* Move Pregnancy tab here, only show if user type is 'user' */}
                {user?.type === 'user' && (
                  <Tab
                    iconPosition="start"
                    icon={<IconBabyCarriage size="22" />}
                    label={t('Pregnancy')}
                    {...a11yProps(1)}
                  />
                )}
                <Tab
                  iconPosition="start"
                  icon={<IconLock size="22" />}
                  label={t('Security')}
                  {...a11yProps(user?.type === 'user' ? 2 : 1)}
                />
              </Tabs>
            </Box>
            <Divider />
            <CardContent>
              <TabPanel value={value} index={0}>
                <AccountTab />
              </TabPanel>
              {/* Adjusted index for PregnancyTab based on user type */}
              {user?.type === 'user' && (
                <TabPanel value={value} index={1}>
                  <PregnancyTab />
                </TabPanel>
              )}
              <TabPanel
                value={user?.type === 'user' ? value : value - 1}
                index={user?.type === 'user' ? 2 : 1}
              >
                <SecurityTab />
              </TabPanel>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSetting;