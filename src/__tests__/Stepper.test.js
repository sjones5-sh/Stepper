/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';

import { Stepper, Steps, Step, WithWizard } from '../index';

describe('Stepper', () => {
  describe.skip('with no props', () => {
    let wizard;
    let unmountComp;
    beforeEach(() => {
      const { unmount } = render(
        <Stepper>
          <WithWizard>
            {(prop) => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Stepper>
      );
      unmountComp = unmount;
    });

    afterEach(() => {
      unmountComp();
    });

    it('should go to the next and previous steps', () => {
      const { next, previous } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      next();
      expect(wizard.step).toEqual({ id: 'slytherin' });
      previous();
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    it('should push steps onto the stack', () => {
      const { push } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      act(() => {
        push('slytherin');
      });
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    it('should replace steps in the stack', () => {
      const { replace } = wizard;
      act(() => {
        replace();
      });
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    it('should pull steps off the stack', () => {
      const { next, go } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      act(() => {
        next();
      });
      expect(wizard.step).toEqual({ id: 'slytherin' });
      act(() => {
        go(-1);
      });
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    it('should do nothing if an invalid step is pushed', () => {
      const { push } = wizard;
      act(() => {
        push('hufflepuff');
      });
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });
  });

  describe('with onNext prop', () => {
    let onNext;

    let wizard;
    let unmountComp;
    beforeEach(() => {
      onNext = jest.fn(({ push }) => push());
      const { unmount } = render(
        <Stepper onNext={onNext}>
          <WithWizard>
            {(prop) => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Stepper>
      );
      unmountComp = unmount;
    });

    afterEach(() => {
      unmountComp();
    });

    it('call onNext and go to the next step', () => {
      const { next } = wizard;
      next();
      expect(onNext).toHaveBeenCalled();
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });
  });

  describe('with existing history', () => {
    const history = {
      replace: () => null,
      listen: () => () => null,
      location: {
        pathname: '/slytherin'
      }
    };

    let wizard;
    let unmountComp;
    beforeEach(() => {
      const { unmount } = render(
        <Stepper history={history}>
          <WithWizard>
            {(prop) => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Stepper>
      );
      unmountComp = unmount;
    });

    afterEach(() => {
      unmountComp();
    });

    it('starts at the step in history', () => {
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });
  });

  describe('with existing history and non-strict route matching', () => {
    const history = {
      replace: () => null,
      listen: () => () => null,
      location: {
        pathname: '/slytherin/snape'
      }
    };

    let wizard;
    let unmountComp;
    beforeEach(() => {
      const { unmount } = render(
        <Stepper history={history} exactMatch={false}>
          <WithWizard>
            {(prop) => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Stepper>
      );
      unmountComp = unmount;
    });

    afterEach(() => unmountComp());

    it('matches the step', () => {
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });
  });
});
