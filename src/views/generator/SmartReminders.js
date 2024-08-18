import React, { useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Alert,
  AlertTitle,
} from '@mui/material';
import { IconTrash, IconEdit, IconMicrophone } from '@tabler/icons';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ParentCard from '../../components/shared/ParentCard';
import config from 'src/config';
import breadcrumbImg from 'src/assets/images/breadcrumb/calender.jpg';
import { useTranslation } from 'react-i18next';



const PregnancyRemindersTable = () => {
    const { t } = useTranslation();

  const columns = [
    { id: 'event', label: t('Event'), minWidth: 150 },
    { id: 'date', label: t('Date'), minWidth: 100 },
    { id: 'time', label: t('Time'), minWidth: 100 },
    { id: 'day', label: t('Day'), minWidth: 100 },
    { id: 'occurrence', label: t('Occurrence'), minWidth: 150 },
    { id: 'action', label: t('Action'), minWidth: 170 },
  ];

  const BCrumb = [{ to: '/', title: 'Home' }, { title: t('Pregnancy Reminders') }];

  const [recording, setRecording] = useState(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  const [alert, setAlert] = useState('');

  const handleRecord = () => {
    if (recording) {
      setRecording(false);
      return;
    }
    setRecording(true);
    startRecording();
  };

  const startRecording = () => {
    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          audioChunks = [];
          sendAudioToServer(audioBlob);
        };

        // Stop recording after 5 seconds
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
        setResult(t('Error: {{errorMessage}}', { errorMessage: error.message }));
        setRecording(false); // Stop recording if there's an error
      });
  };

  const sendAudioToServer = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio_data', audioBlob);

    fetch(`${config.apiUrl}/api/speech-to-text`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              t('Network response was not ok: {{responseText}}', { responseText: text }),
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.extracted_data && data.extracted_data.events) {
          setData((prevData) => [...prevData, ...data.extracted_data.events]); // Append new reminders
          setResult('');
          setAlert(t('Reminder set with success!')); // Set success alert
        } else {
          setResult(t('Error: No events data returned from the server.'));
          console.log('Response Data:', data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setResult(t('Error: {{errorMessage}}', { errorMessage: error.message }));
      });
  };

  const formatTime = (time) => {
    if (!time) return '';

    let [hour, minute] = time.split(':');
    let ampm = 'AM';

    if (parseInt(hour, 10) >= 12) {
      ampm = 'PM';
      if (parseInt(hour, 10) > 12) {
        hour -= 12;
      }
    } else if (hour === '0') {
      hour = 12; // Midnight case
    }

    return `${hour}:${minute} ${ampm}`;
  };

  const getDayOfWeek = (dateString) => {
    if (!dateString) return '';

    const [day, month, year] = dateString.split('/').map((part) => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <PageContainer
      title={t('Pregnancy Reminders')}
      description={t('Manage your pregnancy reminders')}
    >
      <Breadcrumb title={t('Pregnancy Reminders')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt={t('Ultrasound')} width="150px" />
        </Box>
      </Breadcrumb>
      <ParentCard title={t('Pregnancy Reminders')}>
        <Paper variant="outlined">
          <TableContainer
            sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440 }}
          >
            <Table stickyHeader aria-label={t('sticky table')}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Typography variant="h6" fontWeight="500">
                        {t(column.label)}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Typography variant="h6">{row.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.time ? formatTime(row.time) : ''}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.date ? getDayOfWeek(row.date) : ''}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.recurrence}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1} direction="row" alignItems="center">
                        <IconButton>
                          <IconEdit width={18} />
                        </IconButton>
                        <IconButton>
                          <IconTrash width={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <IconButton onClick={handleRecord} color={recording ? 'error' : 'primary'}>
              <IconMicrophone width={24} />
            </IconButton>
            <Typography variant="h6" mt={2}>
              {recording ? t('Recording...') : t('Record Voice')}
            </Typography>
            <Box mt={2}>
              {alert && (
                <Alert severity="success">
                  <AlertTitle>{t('Success')}</AlertTitle>
                  {alert}
                </Alert>
              )}
              <Typography variant="h6">{result}</Typography>
            </Box>
          </Box>
        </Paper>
      </ParentCard>
    </PageContainer>
  );
};

export default PregnancyRemindersTable;
