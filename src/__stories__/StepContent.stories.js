import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import { StepContent } from '../index';
import { StepContext } from '../Components/Step';

const storyExport = {
  title: 'Stepper/Step',
  component: StepContent
};

export default storyExport;

const Content = () => (
  <Box p={2} height={200} bgcolor={'primary.main'}>
    <Typography variant={"h5"}>Content</Typography>
  </Box>
);

const basic = ({ complete, active, collapsible, ...args }) => {
  return (
    <StepContext.Provider
      value={{
        complete,
        active
      }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant={'h5'}>Custom</Typography>
          <StepContent {...args} collapsible={collapsible}>
            <Typography>Content</Typography>
            <Content />
          </StepContent>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={'h5'}>showOnActive</Typography>
          <StepContent showOnActive collapsible={collapsible}>
            <Typography>showOnActive</Typography>
            <Content />
          </StepContent>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={'h5'}>hideOnActive</Typography>
          <StepContent hideOnActive collapsible={collapsible}>
            <Typography>hideOnActive</Typography>
            <Content />
          </StepContent>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={'h5'}>hideOnComplete</Typography>
          <StepContent hideOnComplete collapsible={collapsible}>
            <Typography>hideOnComplete</Typography>
            <Content />
          </StepContent>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={'h5'}>showOnComplete</Typography>
          <StepContent showOnComplete collapsible={collapsible}>
            <Typography>showOnComplete</Typography>
            <Content />
          </StepContent>
        </Grid>
      </Grid>
    </StepContext.Provider>
  );
};
export const Basic = basic.bind({});
Basic.args = {
  complete: false,
  active: false,
  collapsible: true,
  showOnActive: true,
  hideOnActive: false,
  hideOnComplete: true,
  showOnComplete: false
};
