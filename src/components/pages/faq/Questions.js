import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, Box } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';

const Questions = () => {
  return (
    <Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Typography variant="h3" textAlign="center" mb={1}>Frequently Asked Questions</Typography>
          <Typography variant="h6" fontWeight={400} color="textSecondary" textAlign="center" mb={4}>
            Learn more about how our platform supports pregnant women and gynecologists
          </Typography>

          {/* Question 1 */}
          <Accordion elevation={9}>
            <AccordionSummary
              expandIcon={<IconChevronDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" px={2} py={1}>What is 23Weeks?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                23Weeks is a comprehensive platform designed to support pregnant women throughout
                their pregnancy journey and assist gynecologists in enhancing patient care with AI-driven tools.
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
              <Typography variant="h6" px={2} py={1}>How does 23Weeks support pregnant women?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                23Weeks provides personalized pregnancy reminders, access to educational resources,
                and tools to track your baby's development. Additionally, you can connect with
                gynecologists and access valuable insights tailored to your needs.
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
              <Typography variant="h6" px={2} py={1}>What features does 23Weeks offer for gynecologists?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                For gynecologists, 23Weeks offers advanced tools like ultrasound quality enhancement,
                head circumference measurement, report generation, and AI-driven patient management
                insights, all designed to improve patient care and streamline workflows.
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
              <Typography variant="h6" px={2} py={1}>Can I use 23Weeks for free?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                Yes, 23Weeks offers a Basic plan for free, which includes essential features for
                both pregnant women and gynecologists. You can also explore our Advanced and Premium
                plans for more comprehensive services.
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
              <Typography variant="h6" px={2} py={1}>How can I get support if I have questions?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                Our support team is here to help! You can reach out via our contact form, chat with
                us directly through the app, or access our extensive FAQ section for quick answers.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Questions;
