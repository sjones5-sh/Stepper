import React from 'react';
import {Typography} from '@mui/material';
import {BrowserRouter, Route} from 'react-router-dom';
import {Step, StepContent, StepHead, Stepper, Steps} from '../index';
import {
  BasicContainer,
} from './Components/StyledStepperComponents';
import {Navigation} from './Components/Navigation';

const storyExport = {
  title: 'Stepper',
  component: Stepper
};

export default storyExport;


const AccordionTemplate = (args) => {
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
                  <StepHead>
                    <Typography variant={'h4'}>
                      Step 1
                    </Typography>
                  </StepHead>
                  <StepContent collapsible>
                    <Typography variant={'h5'}>
                      Step X Content
                    </Typography>
                  </StepContent>
                </Step>
                <Step id={'Step2'}>
                  <StepHead>
                    <Typography variant={'h4'}>
                      Step 2
                    </Typography>
                  </StepHead>
                  <StepContent collapsible>
                    <Typography variant={'h5'}>
                      Step X Content
                    </Typography>
                  </StepContent>
                </Step>
                <Step id={'Step3'}>
                  <StepHead>
                    <Typography variant={'h4'}>
                      Step 3
                    </Typography>
                  </StepHead>
                  <StepContent collapsible>
                    <Typography variant={'h5'}>
                      Step X Content
                    </Typography>
                  </StepContent>
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
export const Accordion = AccordionTemplate.bind({});
Accordion.args = {wizard: false};
