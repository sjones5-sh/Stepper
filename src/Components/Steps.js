import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StepperContext } from './Stepper';

class Steps extends Component {
  init() {
    const children = React.Children.toArray(this.props.children).filter(
      Boolean
    );
    const steps = React.Children.map(
      children,
      ({ props: { children, render, ...config } }) => config
    );
    this.context.init(steps);
  }

  componentDidMount() {
    return this.init();
  }

  componentDidUpdate(prevProps) {
    if (this.props.children.length !== prevProps.children.length) {
      return this.init();
    }
  }

  render() {
    const step = this.props.step || this.context.step;
    const { flow, nonLinear, steps } = this.context;
    const { children } = this.props;
    const activeStep = steps.findIndex(({ id }) => id === step.id);
    let lastCompletedStep = -1;

    return React.Children.map(children, (child, index) => {
      if (!child) {
        return;
      }

      const active = child.props.id === step.id;
      const complete =
        child.props.complete || (!nonLinear && index < activeStep);
      lastCompletedStep = (complete && index) || lastCompletedStep;

      const stepProps = {
        active,
        index,
        first: index === 0,
        last: index === children.length - 1,
        complete,
        ...child.props,
        disabled:
          typeof child.props.disabled === 'boolean'
            ? child.props.disabled
            : !nonLinear && index > Math.max(activeStep, lastCompletedStep + 1)
      };

      if (flow === 'wizard' && child.props.id !== step.id) {
        return null;
      }

      return React.cloneElement(child, stepProps);
    }).filter((child) => child);
  }
}

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

Steps.defaultProps = {
  step: null
};

Steps.contextType = StepperContext;

export default Steps;
