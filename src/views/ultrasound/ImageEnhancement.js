import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/ultrasound.png';
import config from 'src/config';
import { useTranslation } from 'react-i18next';

const BCrumb = [
  {
    to: '/',
    title: 'Ultrasound',
  },
  {
    title: 'Enhancement',
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

const ImageQualityEnhancement = () => {
  const { t } = useTranslation();
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file);
      setEnhancedImage(null);
      setError(null);
    }
  };

  const enhanceImage = async () => {
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', originalImage);

    try {
      const response = await fetch(`${config.apiUrl}/api/enhance-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(t('Server error: {{errorText}}', { errorText }));
      }

      const data = await response.json();
      if (!data.enhancedImage) {
        throw new Error(t('No enhanced image received'));
      }
      setEnhancedImage(data.enhancedImage);
    } catch (err) {
      setError(
        t('An error occurred while processing the image: {{errorMessage}}', {
          errorMessage: err.message,
        }),
      );
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setError(null);
  };

  return (
    <PageContainer title={t('Image Quality Enhancement')}>
      <Breadcrumb title={t('Image Quality Enhancement')} items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt={t('Ultrasound')} width="155px" />
        </Box>
      </Breadcrumb>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                {t('Original Image')}
              </Typography>
              <ImageContainer>
                {originalImage ? (
                  <img
                    src={URL.createObjectURL(originalImage)}
                    alt={t('Original ultrasound')}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">{t('No image uploaded')}</Typography>
                )}
              </ImageContainer>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                {t('Upload Image')}
                <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept="image/*" />
              </Button>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <FixedHeightCard>
            <FixedHeightCardContent>
              <Typography variant="h6" gutterBottom>
                {t('Enhanced Image')}
              </Typography>
              <ImageContainer>
                {enhancedImage ? (
                  <img
                    src={`data:image/png;base64,${enhancedImage}`}
                    alt={t('Enhanced image')}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography color="textSecondary">
                    {isProcessing ? t('Enhancing image...') : t('No enhanced image yet')}
                  </Typography>
                )}
              </ImageContainer>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                fullWidth
                onClick={handleReset}
                disabled={!originalImage && !enhancedImage}
              >
                {t('Reset')}
              </Button>
            </FixedHeightCardContent>
          </FixedHeightCard>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('Enhance Image Quality')}
              </Typography>
              {!enhancedImage && !isProcessing && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={enhanceImage}
                  disabled={!originalImage}
                  fullWidth
                >
                  {t('Enhance Image')}
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

export default ImageQualityEnhancement;