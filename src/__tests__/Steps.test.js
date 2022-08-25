import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Steps, Step } from '../index';
import { StepperContext } from '../Components/Stepper';

const context = {
  step: {
    id: 'foo'
  },
  steps: [],
  init: jest.fn()
};

describe('Steps', () => {
  it('should call init', () => {
    render(
      <StepperContext.Provider value={context}>
        <Steps>
          <Step id="foo" />
        </Steps>
      </StepperContext.Provider>
    );

    expect(context.init).toHaveBeenCalledWith([{ id: 'foo' }]);
  });

  it('should render correct child if controlled', () => {
    const rendered = render(
      <StepperContext.Provider value={context}>
        <Steps step={{ id: 'bar' }}>
          <Step id="foo">foo</Step>
          <Step id="bar">bar</Step>
        </Steps>
      </StepperContext.Provider>
    );

    expect(
      rendered.container.querySelector('.Stepper__Step--active')
    ).toHaveTextContent('bar');
  });

  it('should render only one child if in wizard mode', () => {
    const rendered = render(
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

    expect(rendered.container.querySelectorAll('.Stepper__Step')).toHaveLength(
      1
    );
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
