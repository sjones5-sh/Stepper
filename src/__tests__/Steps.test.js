/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Steps, Step } from '../index';
import {StepperContext} from "../utils/useStepper";

const context = {
  step: {
    id: 'foo'
  },
  steps: [],
  init: jest.fn()
};

const TestStepper = () => {
  const [steps, setSteps] = useState([0]);
  return (
    <StepperContext.Provider value={context}>
      <Steps>
        {steps.map((stepID) => (
          <Step id={`foo-${stepID}`} key={stepID} />
        ))}
      </Steps>
      <button
        onClick={() =>
          setSteps((state) => [...state, state[state.length - 1] + 1])
        }>
        Add Step
      </button>
      <button
        onClick={() => setSteps((state) => state.slice(0, state.length - 1))}>
        Remove Step
      </button>
    </StepperContext.Provider>
  );
};

describe('Steps', () => {
  it('should call init on mount', () => {
    render(
      <StepperContext.Provider value={context}>
        <Steps>
          <Step id="foo" />
        </Steps>
      </StepperContext.Provider>
    );

    expect(context.init).toHaveBeenCalledWith([{ id: 'foo' }]);
  });
  it('should call init on children update', () => {
    render(<TestStepper />);

    expect(context.init).toHaveBeenCalledWith([{ id: 'foo-0' }]);
    fireEvent.click(screen.getByText('Add Step'));
    expect(context.init).toHaveBeenCalledWith([
      { id: 'foo-0' },
      { id: 'foo-1' }
    ]);
    fireEvent.click(screen.getByText('Add Step'));
    expect(context.init).toHaveBeenCalledWith([
      { id: 'foo-0' },
      { id: 'foo-1' },
      { id: 'foo-2' }
    ]);
    fireEvent.click(screen.getByText('Remove Step'));
    expect(context.init).toHaveBeenCalledWith([
      { id: 'foo-0' },
      { id: 'foo-1' }
    ]);
    fireEvent.click(screen.getByText('Remove Step'));
    expect(context.init).toHaveBeenCalledWith([{ id: 'foo-0' }]);
  });

  it('should render correct child if controlled', () => {
    render(
      <StepperContext.Provider value={context}>
        <Steps step={{ id: 'bar' }}>
          <Step id="foo">foo</Step>
          <Step id="bar">bar</Step>
        </Steps>
      </StepperContext.Provider>
    );

    expect(screen.getByText('foo')).not.toHaveClass('Stepper__Step--active');
    expect(screen.getByText('bar')).toHaveClass('Stepper__Step--active');
  });

  it('should render only one child if in wizard mode', () => {
    const { container } = render(
      <StepperContext.Provider
        value={{
          ...context,
          flow: 'wizard'
        }}>
        <Steps>
          <Step id="foo" />
          <Step id="bar" />
        </Steps>
      </StepperContext.Provider>
    );

    expect(container.querySelectorAll('.Stepper__Step')).toHaveLength(1);
  });

  it('should render added step props to children', async () => {
    const renderFn = jest.fn();
    render(
      <StepperContext.Provider
        value={{
          ...context,
          step: {
            id: 'foo'
          }
        }}>
        <Steps>
          <Step id="foo" baz={'🚀'} render={renderFn} />
          <Step id="bar" baz={'🔥'} complete={false} render={renderFn} />
        </Steps>
      </StepperContext.Provider>
    );
    const expectedProps = [
      {
        active: true,
        baz: '🚀',
        first: true,
        id: 'foo',
        index: 0,
        last: false,
        complete: false,
        disabled: false
      },
      {
        active: false,
        baz: '🔥',
        first: false,
        id: 'bar',
        index: 1,
        last: true,
        complete: false,
        disabled: true
      }
    ];

    expectedProps.forEach((props) => {
      expect(renderFn).toHaveBeenCalledWith(expect.objectContaining(props));
    });
  });
});
