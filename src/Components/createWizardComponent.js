import React from 'react';
import renderCallback from '../utils/commonRender';
import {StepperContext} from "../utils/useStepper";

const createWizardComponent = (name) => {
  const WizardComponent = (props) => (
    <StepperContext.Consumer>
      {(wizard) => renderCallback(props, wizard)}
    </StepperContext.Consumer>
  );

  WizardComponent.displayName = name;

  return WizardComponent;
};

export default createWizardComponent;
