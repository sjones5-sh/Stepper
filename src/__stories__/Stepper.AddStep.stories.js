import React, { useState } from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { StepContent, StepHead, Stepper, Steps } from '../index';
import {
  StyledStep,
  StyledStepper
} from './Components/StyledStepperComponents';
import { Navigation } from './Components/Navigation';

const storyExport = {
  title: 'Stepper',
  component: Stepper
};

export default storyExport;

const BasicContainer = styled.div`
  align-items: center;
  background-color: white;
`;

const BasicTemplate = (args) => {
  const [steps, setSteps] = useState([0]);

  return (
    <BasicContainer>
      <BrowserRouter>
        <Route
          render={({ history }) => (
            <StyledStepper {...args} history={history}>
              <ButtonGroup variant="outlined">
                <Button
                  onClick={() =>
                    setSteps((state) => [...state, state[state.length - 1] + 1])
                  }>
                  Add Step
                </Button>
                <Button
                  onClick={() =>
                    setSteps((state) => state.slice(0, state.length - 1))
                  }>
                  Remove Step
                </Button>
              </ButtonGroup>
              <Steps>
                {steps.map((stepID) => (
                  <StyledStep id={`Foo-${stepID}`} key={`Foo-${stepID}`}>
                    <StepHead>
                      <Typography>Step-{stepID} Head</Typography>
                    </StepHead>
                    <StepContent collapsible>
                      <Typography>Step-{stepID} Content</Typography>
                    </StepContent>
                  </StyledStep>
                ))}
              </Steps>
              <Navigation />
            </StyledStepper>
          )}
        />
      </BrowserRouter>
    </BasicContainer>
  );
};
export const AddStep = BasicTemplate.bind({});
AddStep.args = { wizard: false };
