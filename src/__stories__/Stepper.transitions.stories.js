import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';
import { Stepper, Steps } from '../index';
import { StyledStep } from './Components/StyledStepperComponents';
import { Navigation } from './Components/Navigation';

const storyExport = {
  title: 'Components/Stepper/StepperBase',
  component: Stepper
};

export default storyExport;

const TransitionExampleSteps = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

const TransitionStoryContainer = styled.div`
  margin: 0 auto;
  align-items: center;
  background-color: white;
  max-width: 400px;
  position: relative;
`;

export const transitions = () => {
  return (
    <TransitionStoryContainer>
      <BrowserRouter>
        <Route
          render={({ history }) => (
            <Stepper
              wizard={true}
              history={history}
              render={({ step }) => (
                <Grid container>
                  <Grid item xs={12}>
                    <Box height={300}>
                      <Typography variant={'h5'}>
                        Current Route: {history.location.pathname}
                      </Typography>
                      <TransitionGroup>
                        <style jsx>
                          {`
                            .Transition-example-enter {
                              opacity: 0.01;
                              transform: translate(100%, 0);
                            }

                            .Transition-example-enter.Transition-example-enter-active {
                              opacity: 1;
                              transform: translate(0, 0);
                              transition: transform 1000ms
                                  cubic-bezier(0.4, -0.6, 0.6, 1.4),
                                opacity 1000ms ease;
                            }

                            .Transition-example-exit {
                              opacity: 1;
                            }

                            .Transition-example-exit.Transition-example-exit-active {
                              opacity: 0.01;
                              transform: translate(-100%, 0);
                              transition: transform 1000ms
                                  cubic-bezier(0.4, -0.6, 0.6, 1.4),
                                opacity 1000ms ease;
                            }
                          `}
                        </style>
                        <CSSTransition
                          key={step.id}
                          classNames="Transition-example"
                          timeout={1000}>
                          <TransitionExampleSteps>
                            <Steps key={step.id} step={step}>
                              <StyledStep id={'Step1'}>
                                <Typography>Some Content Step1</Typography>
                              </StyledStep>
                              <StyledStep id={'Step2'}>
                                <Typography>Some Content Step2</Typography>
                              </StyledStep>
                              <StyledStep id={'Step3'}>
                                <Typography>Some Content Step3</Typography>
                              </StyledStep>
                              <StyledStep id={'Step4'}>
                                <Typography>Some Content Step4</Typography>
                              </StyledStep>
                            </Steps>
                          </TransitionExampleSteps>
                        </CSSTransition>
                      </TransitionGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Navigation />
                  </Grid>
                </Grid>
              )}
            />
          )}
        />
      </BrowserRouter>
    </TransitionStoryContainer>
  );
};
