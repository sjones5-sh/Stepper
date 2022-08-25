import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { WithWizard } from '../../index';

export const Navigation = () => (
  <WithWizard
    render={({ next, previous, step, steps }) => (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Button
          disabled={!steps.indexOf(step)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            previous();
          }}>
          Back
        </Button>
        <Typography>Current Step ID: {step.id}</Typography>
        <Button
          disabled={steps.indexOf(step) === steps.length - 1}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            next();
          }}>
          Next
        </Button>
      </Grid>
    )}
  />
);
