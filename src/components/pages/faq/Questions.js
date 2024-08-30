import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, Box } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

const Questions = () => {
      const { t } = useTranslation();
  return (
    <Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Typography variant="h3" textAlign="center" mb={1}>
            {t('Frequently Asked Questions')}
          </Typography>
          <Typography variant="h6" fontWeight={400} color="textSecondary" textAlign="center" mb={4}>
            {t('Learn more about how our platform supports pregnant women and gynecologists')}
          </Typography>

          {/* Question 1 */}
          <Accordion elevation={9}>
            <AccordionSummary
              expandIcon={<IconChevronDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" px={2} py={1}>
                {t('Q1')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                {t('A1')}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Question 2 */}
          <Accordion elevation={9}>
            <AccordionSummary
              expandIcon={<IconChevronDown />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h6" px={2} py={1}>
                {t('Q2')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                {t('A2')}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Question 3 */}
          <Accordion elevation={9}>
            <AccordionSummary
              expandIcon={<IconChevronDown />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="h6" px={2} py={1}>
                {t('Q3')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                {t('A3')}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Question 4 */}
          <Accordion elevation={9}>
            <AccordionSummary
              expandIcon={<IconChevronDown />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography variant="h6" px={2} py={1}>
                {t('Q4')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                {t('A4')}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Question 5 */}
          <Accordion elevation={9}>
            <AccordionSummary
              expandIcon={<IconChevronDown />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography variant="h6" px={2} py={1}>
                {t('Q5')}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                {t('A5')}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Questions;
