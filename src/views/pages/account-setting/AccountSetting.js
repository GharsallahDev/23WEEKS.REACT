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

const UserType = {
  USER: 'user',
  GYNECOLOGIST: 'gynecologist',
};

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

  const isUser = user?.type === UserType.USER;

  const tabs = [
    { icon: <IconUserCircle size="22" />, label: t('Account'), component: <AccountTab /> },
    ...(isUser
      ? [
          {
            icon: <IconBabyCarriage size="22" />,
            label: t('Pregnancy'),
            component: <PregnancyTab />,
          },
        ]
      : []),
    { icon: <IconLock size="22" />, label: t('Security'), component: <SecurityTab /> },
  ];

  return (
    <PageContainer title="Account Setting" description="this is Account Setting page">
      <Breadcrumb title="Account Setting" items={BCrumb} />

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
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    iconPosition="start"
                    icon={tab.icon}
                    label={tab.label}
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </Box>
            <Divider />
            <CardContent>
              {tabs.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                  {tab.component}
                </TabPanel>
              ))}
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSetting;