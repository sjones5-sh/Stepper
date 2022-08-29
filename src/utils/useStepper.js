import {createContext, useContext} from "react";

export const StepperContext = createContext({
  go: () => {},
  set: () => {},
  history: {},
  init: () => {},
  next: () => {},
  previous: () => {},
  push: () => {},
  replace: () => {},
  urlForStep: () => {},
  flow: 'stepper',
  nonLinear: false
});

export const useStepper = () => {
  return useContext(StepperContext)
}
