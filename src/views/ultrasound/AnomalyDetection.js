import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/ultrasound.png';
import config from 'src/config';
const BCrumb = [
  {
    to: '/',
    title: 'Ultrasound',
  },
  {
    title: 'CSP and LV detection',
  },
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FixedHeightCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const FixedHeightCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const ImageContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
  border: '2px dashed #ccc',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
});

const InformationCard = styled(Card)({
  marginTop: 24,
  backgroundColor: 'primary.light',
});

const AnomalyDetection = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file);
      setDetectedImage(null);
      setError(null);
    }
  };

  const detectImage = async () => {
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', originalImage);

    try {
      const response = await fetch(`${config.apiUrl}/api/detect-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      if (!data.detectedImage) {
        throw new Error('No detected image received');
      }
      setDetectedImage(data.detectedImage);
    } catch (err) {
      setError(`An error occurred while processing the image: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setDetectedImage(null);
    setError(null);
  };

  return (
    <PageContainer title="Brain Structure Detection">
      <Breadcrumb title="Brain Structure Detection" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="155px" />
        </Box>
      </Breadcrumb>

      <Grid container spacing={3}>
      <Grid item xs={12}>
          <InformationCard>
            <CardContent>
              <Typography sx={{ color: '#dd1367' }} variant="h6" gutterBottom>
                Why Monitoring CSP and LV is Important
              </Typography>
              <Typography variant="body1" paragraph>
                Monitoring CSP and LV during pregnancy is a key component of comprehensive fetal evaluation, aiding in the early detection of potential issues, guiding appropriate management, and improving outcomes for both the baby and the family.
              </Typography>
            </CardContent>
          </InformationCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                Original Image
              </Typography>
              <ImageContainer>
                {originalImage ? (
                  <img
                    src={URL.createObjectURL(originalImage)}
                    alt="Original ultrasound"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">No image uploaded</Typography>
                )}
              </ImageContainer>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept="image/*" />
              </Button>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                Detected Image
              </Typography>
              <ImageContainer>
                {detectedImage ? (
                  <img
                    src={`data:image/png;base64,${detectedImage}`}
                    alt="Detected image"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">
                    {isProcessing ? 'Detecting CSP and LV...' : 'No Detected yet'}
                  </Typography>
                )}
              </ImageContainer>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                fullWidth
                onClick={handleReset}
                disabled={!originalImage && !detectedImage}
              >
                Reset
              </Button>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                CSP and LV detection
              </Typography>
              {!detectedImage && !isProcessing && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={detectImage}
                  disabled={!originalImage}
                  fullWidth
                >
                  Detect
                </Button>
              )}
              {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        
      </Grid>
    </PageContainer>
  );
};

export default AnomalyDetection;
