import React from 'react';
import {Typography} from '@mui/material';
import {Step, Stepper, Steps} from '../index';
import {BasicContainer} from './Components/StyledStepperComponents';
import {Navigation} from './Components/Navigation';

const storyExport = {
  title: 'Stepper',
  component: Stepper
};

export default storyExport;

const Simple1 = (args) => {
  return (
    <BasicContainer>
      <Stepper {...args}>
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
  );
}
export const Simple = Simple1.bind({});
Simple.args = {wizard: true};

