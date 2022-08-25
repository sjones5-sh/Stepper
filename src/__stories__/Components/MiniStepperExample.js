import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { StepContent, Steps } from '../../index';
import {
  StyledStep,
  StyledStepHead,
  StyledStepper
} from './StyledStepperComponents';
import { Navigation } from './Navigation';

export const MiniStepperExample = ({ history }) => {
  const [complete, setComplete] = useState(false);
  return (
    <StyledStepper history={history} basename={'/base'}>
      <Steps>
        <StyledStep id={'1'} complete={complete}>
          <StyledStepHead>
            <Typography>Base 1</Typography>
            <StepContent showOnActive>
              <Typography>🏃‍♂️ showOnActive</Typography>
            </StepContent>
            <StepContent hideOnActive>
              <Typography>👻 hideOnActive</Typography>
            </StepContent>
            <StepContent hideOnComplete>
              <Typography>🚀 hideOnComplete</Typography>
            </StepContent>
            <StepContent showOnComplete>
              <Typography>✅ showOnComplete</Typography>
            </StepContent>
            <StepContent showOnComplete hideOnActive>
              <Typography>✅ 👻 showOnComplete AND hideOnActive</Typography>
            </StepContent>
          </StyledStepHead>
          <StepContent>
            <Typography>B1 Content</Typography>
            <FormControlLabel
              label="Complete"
              control={
                <Checkbox
                  checked={complete}
                  onChange={() => setComplete((complete) => !complete)}
                />
              }
            />
          </StepContent>
        </StyledStep>
        <StyledStep id={'2'}>
          <StyledStepHead>
            <Typography>Base 2</Typography>
          </StyledStepHead>
          <StepContent>
            <Typography>B2 Content</Typography>
          </StepContent>
        </StyledStep>
        <StyledStep id={'3'}>
          <StyledStepHead>
            <Typography>Base 3</Typography>
          </StyledStepHead>
          <StepContent>
            <Typography>B3 Content</Typography>
          </StepContent>
        </StyledStep>
      </Steps>
      <Navigation />
    </StyledStepper>
  );
};
