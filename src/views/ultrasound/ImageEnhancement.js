import React, { useState, useRef } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/ultrasound.png';
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

const adjustContrast = (ctx, imageData, contrast) => {
  const { data, width, height } = imageData;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;     // Red
    data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
    data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue
  }

  return imageData;
};

const ImageQualityEnhancement = () => {
  const { t } = useTranslation();
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file);
      setEnhancedImage(null);
      setError(null);
    }
  };

  const applyFilter = () => {
    if (originalImage) {
      setIsProcessing(true);
      setError(null);
      const img = new Image();
      img.src = URL.createObjectURL(originalImage);
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const contrast = 20; // Adjust this value to control the contrast level
        const adjustedData = adjustContrast(ctx, imageData, contrast);
        ctx.putImageData(adjustedData, 0, 0);
        setEnhancedImage(canvas.toDataURL('image/png'));
        setIsProcessing(false);
      };
      img.onerror = () => {
        setError(t('Failed to load the image.'));
        setIsProcessing(false);
      };
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
                    src={enhancedImage}
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
                  onClick={applyFilter}
                  disabled={!originalImage}
                  fullWidth
                >
                  {t('Enhance Quality')}
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

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </PageContainer>
  );
};

export default ImageQualityEnhancement;