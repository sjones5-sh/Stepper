import React from 'react';
import {Card, Grid, Typography} from '@mui/material';
import {BrowserRouter, Route} from 'react-router-dom';
import {Step, Stepper, Steps} from '../index';
import {
  BasicContainer,
} from './Components/StyledStepperComponents';
import {Navigation} from './Components/Navigation';

const storyExport = {
  title: 'Stepper',
  component: Stepper
};

export default storyExport;


const StepState = ({
  id,
  index,
  ...props
}) => {
  return (
    <Grid item>
      <Step id={id}>
        <Card>
          <Typography>index: {`${index}`}</Typography>
          {[
            'active',
            'first',
            'last',
            'complete',
            'disabled'
          ].map((prop) => (
            <Typography
              color={props[prop] ? 'success.main' : 'error.main'}
            >
              {prop}: {`${props[prop]}`}
            </Typography>
          ))}
        </Card>
      </Step>
    </Grid>
  );
}


const StepStatesTemplate = (args) => {

  const steps = [
    'Step-1',
    'Step-2',
    'Step-3',
    'Step-4',
  ]

  return (
    <BrowserRouter>
      <Route
        render={({history}) => (
          <BasicContainer>
            <Stepper {...args} history={history}>
              <Grid container spacing={2}>
                <Steps>
                  {steps.map((step) => (
                    <StepState id={step} />
                  ))}
                </Steps>
              </Grid>
              <Navigation/>
            </Stepper>
          </BasicContainer>
        )}
      />
    </BrowserRouter>
  );
};
export const StepStates = StepStatesTemplate.bind({});
StepStates.args = {wizard: false};
