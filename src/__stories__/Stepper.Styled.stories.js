import React, {useCallback, useState} from 'react';
import {
  Button, Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import {Step, StepContent, StepHead, Stepper, Steps, useStep, useStepper} from '../index';
import {
  StyledStepper
} from './Components/StyledStepperComponents';
import { Navigation } from './Components/Navigation';
import {titlecase} from "stringcase";

const storyExport = {
  title: 'Stepper',
  component: Stepper
};

export default storyExport;

const StepsContainer = styled.div`
  min-height: 300px;
  & > * {
    margin-bottom: 12px;
  }
`;
const BasicContainer = styled.div`
  align-items: center;
  background-color: white;
`;

const ExampleStep = ({title, fieldNames}) => {
  const {next} = useStepper();
  const {disabled} = useStep();
  const [state, setState] = useState(fieldNames.reduce((acc, fieldName) => ({...acc, [fieldName]: ''}), {}));
  const handleFieldChange = useCallback(({target}) => {
    const {name, value} = target;
    setState(state => ({
      ...state,
      [name]: value
    }))
  }, [setState]);


  return (
    <Card elevation={3} sx={{ opacity: disabled ? '.3' : '1' }}>
      <CardContent>
        <StepHead>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <StepContent showOnComplete showOnActive={false}>
                <Typography variant={'subtitle2'}>
                  {fieldNames.map((fieldName) => (state[fieldName])).filter(Boolean).join(', ')}
                </Typography>
              </StepContent>
            </Grid>
          </Grid>
        </StepHead>
        <StepContent collapsible unmountOnExit={false}>
          {fieldNames.map((fieldName) => (
            <div key={fieldName}>
              <TextField
                name={fieldName}
                label={titlecase(fieldName)}
                value={state[fieldName]}
                onChange={handleFieldChange}
                margin="dense"
              />
            </div>
          ))}
        </StepContent>
      </CardContent>
      <StepContent>
        <CardActions>
          <Button size="small" onClick={next}>Next</Button>
        </CardActions>
      </StepContent>
    </Card>
  );
}

const ComplexTemplate = (args) => {
  const handleStepSelect = useCallback((wizard, { id }) => {
    if (id !== wizard.step.id) {
      return wizard.set(id);
    }
  }, []);

  return (
    <BasicContainer>
      <BrowserRouter>
        <Route
          render={({ history }) => (
            <StyledStepper {...args} history={history}>
              <StepsContainer>
                <Steps>
                  <Step id={'Account'} onClick={handleStepSelect}>
                    <ExampleStep
                      title={'Account'}
                      fieldNames={[
                        'first-name',
                        'last-name',
                        'email',
                        'phone-number'
                      ]}
                    />
                  </Step>
                  <Step id={'Address'} onClick={handleStepSelect}>
                    <ExampleStep
                      title={'Address'}
                      fieldNames={[
                        'address-line-1',
                        'address-line-2',
                        'city',
                        'state',
                        'zip'
                      ]}
                    />
                  </Step>
                  <Step id={'Comment'} onClick={handleStepSelect}>
                    <ExampleStep
                      title={'Comment'}
                      fieldNames={[
                        'comment'
                      ]}
                    />
                  </Step>
                  <Step id={'Complete'}>
                    <StepContent>
                      <Card elevation={3}>
                        <CardContent>
                          <Typography variant={'h2'}>Completed!</Typography>
                        </CardContent>
                      </Card>
                    </StepContent>
                  </Step>
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
export const Styled = ComplexTemplate.bind({});
Styled.args = { wizard: false };
