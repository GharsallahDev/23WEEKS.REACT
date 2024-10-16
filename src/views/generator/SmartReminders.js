import React, { useState, useRef } from 'react';
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
  Button,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';
import { IconMicrophone, IconSquareOff, IconTrash, IconEdit, IconInfoCircle } from '@tabler/icons';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ParentCard from '../../components/shared/ParentCard';
import config from 'src/config';
import breadcrumbImg from 'src/assets/images/breadcrumb/calender.jpg';
import { useTranslation } from 'react-i18next';

const columns = [
  { id: 'event', label: 'Event', minWidth: 150 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'time', label: 'Time', minWidth: 100 },
  { id: 'day', label: 'Day', minWidth: 100 },
  { id: 'occurrence', label: 'Occurrence', minWidth: 150 },
  { id: 'action', label: 'Action', minWidth: 170 },
];

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Pregnancy Reminders' }];

const PregnancyRemindersTable = () => {
  const { t } = useTranslation();
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState('');
  const [alert, setAlert] = useState('');
  const [events, setEvents] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    setStatus('Recording...');
    setAlert('');
    setTranscription('');
    setEvents([]); // Clear previous events
    setRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        setStatus('Processing...');

        try {
          const response = await fetch(`${config.apiUrl}/transcribe`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const text = await response.text();
            throw new Error(`Network response was not ok: ${text}`);
          }

          const result = await response.json();
          setTranscription(result.transcription);

          // Send transcription to new API endpoint
          const processResponse = await fetch(`${config.apiUrl}/api/process_text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcription: result.transcription }),
          });

          if (!processResponse.ok) {
            const text = await processResponse.text();
            throw new Error(`Network response was not ok: ${text}`);
          }

          const processResult = await processResponse.json();
          setEvents(processResult.events || []);

          if (processResult.events && processResult.events.length > 0) {
            setStatus('Recording stopped.');
            setAlert('Transcription completed successfully!');
          } else {
            setStatus('Recording stopped.');
            setAlert('Reminder not set. Please try again with the correct format as shown in the example.');
          }
        } catch (error) {
          setStatus('Error during transcription.');
          setAlert(`Error: ${error.message}`);
        }
      };

      mediaRecorder.start();
    } catch (error) {
      setStatus('Error accessing microphone.');
      setAlert(`Error: ${error.message}`);
      setRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      // Cleanup
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      mediaRecorderRef.current = null;
      audioChunksRef.current = [];
    }
  };

  const formatTime = (time) => {
    if (!time) return '';

    let [hour, minute] = time.split(':');
    let ampm = 'AM';

    hour = parseInt(hour, 10);
    if (hour >= 12) {
      ampm = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    } else if (hour === 0) {
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
    <PageContainer title={t('Pregnancy Reminders')} description="Manage your pregnancy reminders">
      <Breadcrumb title={t('Pregnancy Reminders')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Breadcrumb" width="150px" />
        </Box>
      </Breadcrumb>
      <ParentCard title={t('Pregnancy Reminders')}>

        {/* Example Section */}
        <Box mt={2} mb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Card variant="outlined" sx={{ width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconInfoCircle size={28} color="primary" />
                <Box>
                  <Typography variant="h6" fontWeight="500">
                    {t('How to Set a Reminder')}
                  </Typography>
                  <Typography variant="body1">
                    {t(
                      'Please provide details like the event name, date, time, and recurrence to ensure your reminder is saved correctly. Example: "Doctor Appointment at 3:00 PM every month".'
                    )}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Paper variant="outlined">
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" justifyContent="center" gap={2}>
              <Tooltip title={t('Ensure you specify the event, date, time, and occurrence clearly.')}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStartRecording}
                  disabled={recording}
                  startIcon={<IconMicrophone />}
                >
                  {t('Start Recording')}
                </Button>
              </Tooltip>
              <Tooltip title={t('Click to stop recording and process your voice note.')}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleStopRecording}
                  disabled={!recording}
                  startIcon={<IconSquareOff />}
                >
                  {t('Stop Recording')}
                </Button>
              </Tooltip>
            </Box>
            <Typography variant="h6" mt={2}>
              {recording ? t('Recording...') : t('Record Voice')}
            </Typography>
            <Box mt={2}>
              {alert && (
                <Alert
                  severity={
                    status === 'Processing...'
                      ? 'info'
                      : status.startsWith('Error')
                      ? 'error'
                      : status === 'Recording stopped.' && events.length > 0
                      ? 'success'
                      : 'warning'
                  }
                >
                  <AlertTitle>{status}</AlertTitle>
                  {alert}
                </Alert>
              )}
              <Typography variant="h6">{transcription}</Typography>
            </Box>
            {events.length > 0 && (
              <Box mt={2}>
                <TableContainer
                  sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440 }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            <Typography variant="h6" fontWeight="500">
                              {column.label}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event, index) => (
                        <TableRow hover key={index}>
                          <TableCell>
                            <Typography variant="h6">{event.description}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6">{event.date}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6">
                              {event.time ? formatTime(event.time) : ''}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6">
                              {event.date ? getDayOfWeek(event.date) : ''}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6">{event.recurrence}</Typography>
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
              </Box>
            )}
          </Box>
        </Paper>
      </ParentCard>
    </PageContainer>
  );
};

export default PregnancyRemindersTable;
