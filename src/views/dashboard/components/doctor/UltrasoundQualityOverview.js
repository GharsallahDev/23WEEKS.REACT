import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Stack, Typography, Box } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

const UltrasoundQualityOverview = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      toolbar: {
        show: false,
      },
      height: 275,
    },
    labels: [t('High Quality'), t('Medium Quality'), t('Low Quality')],
    colors: [primary, secondary, theme.palette.error.main],
    plotOptions: {
      pie: {
        donut: {
          size: '89%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              color: textColor,
              fontSize: '20px',
              fontWeight: '600',
              label: '95%',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [70, 20, 5];

  return (
    <DashboardCard title={t('Ultrasound Quality Overview')} subtitle={t('This Month')}>
      <>
        <Box mt={3}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="275px"
          />
        </Box>
        <Stack direction="row" spacing={2} justifyContent="space-between" mt={7}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="600">
                95 %
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {t('Overall Quality')}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="600">
                5 %
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {t('Need Improvement')}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default UltrasoundQualityOverview;