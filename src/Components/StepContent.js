import classnames from 'classnames';
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Collapse } from '@mui/material';
import { StepContext } from './Step';

const StepContentBase = ({
  className,
  classes = {},
  children,
  collapsible,
  showOnActive,
  hideOnActive,
  hideOnComplete,
  showOnComplete,
  TransitionComponentClassName,
  TransitionComponent = collapsible ? Collapse : CSSTransition,
  timeout = collapsible ? undefined : 0,
  ...props
}) => (
  <StepContext.Consumer>
    {(step) => {
      const show =
        props.show !== undefined
          ? props.show
          : (function () {
              if (showOnComplete === true && !step.complete) {
                return false;
              }
              if (showOnActive === true && !step.active) {
                return false;
              }
              if (hideOnActive === true && step.active === true) {
                return false;
              }
              if (hideOnComplete === true && step.complete === true) {
                return false;
              }

              return true;
            })();

      if (timeout === 0 && !show) {
        // This fixes a case where there is a flash
        return null;
      }

      return (
        <TransitionComponent
          in={show}
          className={classnames({
            [TransitionComponentClassName]: collapsible,
            [className]: !collapsible,
            [classes.transition]: !!classes.transition
          })}
          unmountOnExit
          timeout={timeout}
          {...props}>
          <div className={classnames(className, classes.root)}>{children}</div>
        </TransitionComponent>
      );
    }}
  </StepContext.Consumer>
);

export const StepHead = ({ className, ...props }) => (
  <StepContentBase
    className={classnames('Stepper__StepHead', className)}
    TransitionComponentClassName={'Stepper__StepHead--TransitionComponent'}
    {...props}
  />
);

export const StepContent = ({ className, ...props }) => (
  <StepContentBase
    className={classnames('Stepper__StepContent', className)}
    TransitionComponentClassName={'Stepper__StepContent--TransitionComponent'}
    showOnActive={props.hideOnActive === undefined}
    {...props}
  />
);
