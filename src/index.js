import Stepper from './Components/Stepper';
import Steps from './Components/Steps';
import Step from './Components/Step';
import { StepContent, StepHead } from './Components/StepContent';
import createWizardComponent from './Components/createWizardComponent';
import withWizard from './utils/withWizard';

const WithWizard = createWizardComponent('WithWizard');

export { Stepper, Steps, Step, StepHead, StepContent, WithWizard, withWizard };
