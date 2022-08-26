/**
 * @jest-environment jsdom
 */
/* eslint-disable testing-library/no-node-access, testing-library/no-render-in-setup, testing-library/no-container */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Step, { StepContext } from '../Components/Step';
import { StepperContext } from '../Components/Stepper';

const context = {
  wizard: {
    step: {
      id: 'foo'
    },
    steps: [],
    init: jest.fn()
  }
};

describe('Step', () => {
  it('should call call render function', () => {
    const renderFn = jest.fn();
    render(
      <StepperContext.Provider value={context}>
        <Step id="foo" render={renderFn} />
      </StepperContext.Provider>
    );

    const { init, ...wizard } = context;

    expect(renderFn).toHaveBeenCalledWith({ wizard, id: 'foo' });
  });

  it('should render children function', () => {
    const renderFn = jest.fn();
    render(
      <StepperContext.Provider value={context}>
        <Step id="bar">{renderFn}</Step>
      </StepperContext.Provider>
    );
    const { init, ...wizard } = context;

    expect(renderFn).toHaveBeenCalledWith({ wizard, id: 'bar' });
  });

  it('should render basic classNames', () => {
    const { container } = render(
      <StepperContext.Provider value={context}>
        <Step className={'bar'} id="bar" />
      </StepperContext.Provider>
    );

    expect(container.querySelector('.Stepper__Step')).toBeDefined();
    expect(container.querySelector('.bar')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--active')).toBeNull();
    expect(container.querySelector('.Stepper__Step--complete')).toBeNull();
    expect(container.querySelector('.Stepper__Step--disabled')).toBeNull();
    expect(container.querySelector('.Stepper__Step--first')).toBeNull();
    expect(container.querySelector('.Stepper__Step--last')).toBeNull();
    expect(container.querySelector('.Stepper__Step--error')).toBeNull();
  });

  it('should render state classNames', () => {
    const { container } = render(
      <StepperContext.Provider value={context}>
        <Step
          className={'bar'}
          id="bar"
          active
          complete
          disabled
          first
          last
          error
        />
      </StepperContext.Provider>
    );

    expect(container.querySelector('.Stepper__Step')).toBeDefined();
    expect(container.querySelector('.bar')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--active')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--complete')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--disabled')).toBeNull();
    expect(container.querySelector('.Stepper__Step--first')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--last')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--error')).toBeDefined();
  });

  it('should render classNames disabled only when not active', () => {
    const { container } = render(
      <StepperContext.Provider value={context}>
        <Step id="bar" disabled />
      </StepperContext.Provider>
    );

    expect(container.querySelector('.Stepper__Step')).toBeDefined();
    expect(container.querySelector('.Stepper__Step--active')).toBeNull();
    expect(container.querySelector('.Stepper__Step--disabled')).toBeDefined();
  });

  it('should render apply Click handler', () => {
    const onClick = jest.fn();
    const { container } = render(
      <StepperContext.Provider value={context}>
        <Step id="bar" onClick={onClick} />
      </StepperContext.Provider>
    );

    const { init, ...wizard } = context;

    fireEvent.click(container.querySelector('.Stepper__Step'));
    expect(onClick).toHaveBeenCalledWith(wizard, { id: 'bar' });
  });

  it('provides StepContext', () => {
    const renderFn = jest.fn();
    const Test = () => <StepContext.Consumer>{renderFn}</StepContext.Consumer>;
    const stepProps = {
      id: 'bar',
      active: false,
      complete: true,
      custom: 'foo'
    };
    render(
      <StepperContext.Provider value={context}>
        <Step {...stepProps}>
          <Test />
        </Step>
      </StepperContext.Provider>
    );

    expect(renderFn).toHaveBeenCalledWith(stepProps);
  });
});
