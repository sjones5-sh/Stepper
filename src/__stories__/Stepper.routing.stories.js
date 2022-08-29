import React from 'react';
import {Typography} from '@mui/material';
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


const RoutingTemplate = (args) => {
  return (
    <BrowserRouter>
      <Route
        render={({history}) => (
          <BasicContainer>
            <Stepper {...args} history={history}>
              <Typography variant={'h5'}>
                Current Route: {history.location.pathname}
              </Typography>
              <Steps>
                <Step id={'Step1'}>
                  <Typography variant={'h2'}>
                    Step 1
                  </Typography>
                </Step>
                <Step id={'Step2'}>
                  <Typography variant={'h2'}>
                    Step 2
                  </Typography>
                </Step>
                <Step id={'Step3'}>
                  <Typography variant={'h2'}>
                    Step 3
                  </Typography>
                </Step>
              </Steps>
              <Navigation/>
            </Stepper>
          </BasicContainer>
        )}
      />
    </BrowserRouter>
  );
};
export const Routing = RoutingTemplate.bind({});
Routing.args = {wizard: true};
