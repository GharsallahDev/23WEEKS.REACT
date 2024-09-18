import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Stack,
} from '@mui/material';
import config from 'src/config';
const PregnancySymptoms = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchSymptomsData = async () => {
      try {
        // Fetch symptoms data without week parameter
        const response = await axios.get(`${config.apiUrl}/patients/get`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching symptoms data:', error);
      }
    };

    fetchSymptomsData();
  }, []);

  const theme = useTheme();
  const chartOptions = {
    chart: { height: 350, type: 'line' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: { categories: data.dates || [] },
    colors: [theme.palette.primary.main],
  };

  return (
    <DashboardCard title={t('Pregnancy Symptoms')}>
      <Stack spacing={3}>
        {/* Remove the week selection dropdown */}
        
        <Box>
          <Typography variant="h6">{t('Symptoms Data')}</Typography>
          {data.symptoms && (
            <Chart
              options={chartOptions}
              series={[{ name: 'Symptoms', data: data.symptoms }]}
              type="line"
            />
          )}
        </Box>
        
        <Box>
          <Typography variant="h6">{t('Symptoms Table')}</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Symptom')}</TableCell>
                  <TableCell>{t('Severity')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.symptomsTable && data.symptomsTable.map((symptom) => (
                  <TableRow key={symptom.id}>
                    <TableCell>{symptom.name}</TableCell>
                    <TableCell>{symptom.severity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </DashboardCard>
  );
};

export default PregnancySymptoms;
