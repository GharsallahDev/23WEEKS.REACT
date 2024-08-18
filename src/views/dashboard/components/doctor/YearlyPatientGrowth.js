import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import { Stack, Typography, Box } from '@mui/material';

const YearlyPatientGrowth = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 360,
      stacked: true,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 4,
    },
    xaxis: {
      categories: [
        t('Jan'),
        t('Feb'),
        t('Mar'),
        t('Apr'),
        t('May'),
        t('Jun'),
        t('Jul'),
        t('Aug'),
        t('Sep'),
        t('Oct'),
        t('Nov'),
        t('Dec'),
      ],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: t('New Patients'),
      data: [355, 390, 300, 350, 390, 180, 355, 390, 300, 350, 390, 180],
    },
    {
      name: t('Returning Patients'),
      data: [280, 250, 325, 215, 250, 310, 280, 250, 325, 215, 250, 310],
    },
  ];

  return (
    <DashboardCard title={t('Yearly Patient Growth')}>
      <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="360px" />
      <Stack direction="row" spacing={2} justifyContent="end" mt={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box bgcolor={primary} width="12px" height="12px" borderRadius="50%" />
          <Typography variant="subtitle2" color="textSecondary">
            {t('New Patients')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box bgcolor={secondary} width="12px" height="12px" borderRadius="50%" />
          <Typography variant="subtitle2" color="textSecondary">
            {t('Returning Patients')}
          </Typography>
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

export default YearlyPatientGrowth;