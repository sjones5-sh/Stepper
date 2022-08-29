import React from 'react';
import { Typography } from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';
import classnames from 'classnames';
import styled from 'styled-components';
import { StepContent, Stepper, Steps } from '../index';
import {
  StyledStep,
  StyledStepHead,
  StyledStepper
} from './Components/StyledStepperComponents';
import { Navigation } from './Components/Navigation';
import { MiniStepperExample } from './Components/MiniStepperExample';

const CustomStep1 = ({ wizard, ...props }) => (
  <StyledStep
    className={classnames({
      'Custom-Step-1': true,
      Stepper__Step: true,
      'Stepper__Step--active': props.active,
      'Custom-Step-1--active': props.active,
      'Custom-Step-1--complete': props.complete,
      'Custom-Step-1--disabled': props.disabled,
      'Custom-Step-1--first': props.index === 0,
      'Custom-Step-1--last': props.last,
      'Custom-Step-1--error': props.error
    })}
    onClick={() => props.onClick && props.onClick(wizard, props)}>
    <Typography>Custom Step 2.a</Typography>
    {props.error ? <Typography>😿 error</Typography> : null}
    {!props.active && props.complete ? (
      <Typography>✅ Complete</Typography>
    ) : null}
  </StyledStep>
);
const CustomStep2 = ({ wizard, ...props }) => (
  <StyledStep
    className={classnames({
      'Custom-Step-2': true,
      Stepper__Step: true,
      'Stepper__Step--active': props.active,
      'Custom-Step-2--active': props.active,
      'Custom-Step-2--complete': props.complete,
      'Custom-Step-2--disabled': props.disabled,
      'Custom-Step-2--first': props.index === 0,
      'Custom-Step-2--last': props.last,
      'Custom-Step-2--error': props.error
    })}
    onClick={() => props.onClick(wizard, props)}>
    <Typography>Custom-Step-2.b</Typography>
    {props.error ? (
      <div className={'Custom-Step-2__error'}>
        <Typography>Error: 😿</Typography>
      </div>
    ) : null}
    {!props.active && props.complete ? (
      <div className={'Custom-Step-2__done'}>
        <Typography>This step is done and not active ✅👻</Typography>
      </div>
    ) : null}
    {props.complete ? (
      <div className={'Custom-Step-2__done'}>
        <Typography>This step is done ✅</Typography>
      </div>
    ) : null}
  </StyledStep>
);

const storyExport = {
  title: 'Stepper',
  component: Stepper
};

export default storyExport;

const StepsContainer = styled.div`
  min-height: 300px;
`;
const BasicContainer = styled.div`
  align-items: center;
  background-color: white;
`;

const ComplexTemplate = (args) => {
  const handleStepSelect = (wizard, { id }) => {
    if (id !== wizard.step.id) {
      return wizard.set(id);
    }
  };

  return (
    <BasicContainer>
      <BrowserRouter>
        <Route
          render={({ history }) => (
            <StyledStepper {...args} history={history}>
              <Typography variant={'h5'}>
                Current Route: {history.location.pathname}
              </Typography>
              <StepsContainer>
                <Steps>
                  <StyledStep id={'Step1'} onClick={handleStepSelect}>
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
                        <Typography>
                          ✅👻 showOnComplete AND hideOnActive
                        </Typography>
                      </StepContent>
                    </StyledStepHead>
                    <StepContent collapsible>
                      <Typography>Step 1 Content</Typography>
                    </StepContent>
                  </StyledStep>
                  <StyledStep
                    id={'Custom-Step-1'}
                    error={true}
                    render={CustomStep1}
                    onClick={handleStepSelect}
                  />
                  <StyledStep
                    id={'Custom-Step-2'}
                    complete={true}
                    onClick={handleStepSelect}>
                    {CustomStep2}
                  </StyledStep>
                  <StyledStep id={'base'} onClick={handleStepSelect}>
                    <StyledStepHead>
                      <Typography>Step Head</Typography>
                    </StyledStepHead>
                    <StepContent collapsible>
                      <MiniStepperExample history={history} />
                    </StepContent>
                  </StyledStep>
                  <StyledStep id={'Step3'} onClick={handleStepSelect}>
                    <StyledStepHead>
                      <Typography>Step 3</Typography>
                    </StyledStepHead>
                    <StepContent collapsible>
                      <Typography>Content</Typography>
                      <Typography>Content</Typography>
                      <Typography>Content</Typography>
                      <Typography>Content</Typography>
                    </StepContent>
                  </StyledStep>
                  <StyledStep id={'Step4'} onClick={handleStepSelect}>
                    <StyledStepHead>
                      <Typography>Step 4</Typography>
                    </StyledStepHead>
                    <StepContent collapsible>
                      <div
                        style={{ height: 100, backgroundColor: 'aliceblue' }}>
                        <Typography>Content</Typography>
                      </div>
                    </StepContent>
                  </StyledStep>
                </Steps>
              </StepsContainer>
              <Navigation />
            </StyledStepper>
          )}
        />
      </BrowserRouter>
    </BasicContainer>
  );
};
export const Complex = ComplexTemplate.bind({});
Complex.args = { wizard: false };
