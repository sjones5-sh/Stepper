import styled from 'styled-components';
import { Step, StepHead, Stepper } from '../../index';

export const StyledStep = styled(Step)`
  margin: 4px;
  padding: 4px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: none;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0)
  );
  &.Stepper__Step--active {
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
      rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.08)
    );
  }
  &:hover {
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
      rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.08)
    );
  }
`;
export const StyledStepper = styled(Stepper)`
  margin: 4px;
  padding: 4px;
  border-radius: 4px;
`;
export const StyledStepHead = styled(StepHead)`
  border-radius: 4px;
  border-bottom: #333333 1px solid;
  padding: 4px;
  background-color: #eaeaea;
`;
