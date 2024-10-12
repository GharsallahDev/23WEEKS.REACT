import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { AddPhotoAlternate as UploadIcon } from '@mui/icons-material';
import config from 'src/config';

const SubmitUltrasoundForm = ({ gynecologistId }) => {
  const [patientId, setPatientId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [ultrasoundImage, setUltrasoundImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageChange = (event) => {
    setUltrasoundImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('patient_id', patientId);
    formData.append('gynecologist_id', gynecologistId);
    formData.append('selected_option', selectedOption);
    formData.append('ultrasound_image', ultrasoundImage);

    try {
      const response = await fetch(`${config.apiUrl}/api/submit-ultrasound`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Ultrasound submitted successfully.');
        setOpenSnackbar(true);
        // Reset form
        setPatientId('');
        setSelectedOption('');
        setUltrasoundImage(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed.');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        Submit Ultrasound
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Patient ID"
          variant="outlined"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Selected Option"
          variant="outlined"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="ultrasound-image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="ultrasound-image-upload">
          <IconButton
            color="primary"
            component="span"
            sx={{ mb: 2 }}
            aria-label="upload picture"
          >
            <UploadIcon />
          </IconButton>
          <Typography variant="body1">
            {ultrasoundImage ? ultrasoundImage.name : 'Upload Ultrasound Image'}
          </Typography>
        </label>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!patientId || !selectedOption || !ultrasoundImage}
          >
            Submit
          </Button>
        </Box>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        {successMessage ? (
          <Alert onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </Alert>
        ) : (
          <Alert onClose={handleSnackbarClose} severity="error">
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default SubmitUltrasoundForm;
