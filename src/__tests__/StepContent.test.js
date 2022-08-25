import React from 'react';
import { render } from '@testing-library/react';
import { StepContent } from '../Components/StepContent';
import { StepContext } from '../Components/Step';

const StepContextWrapper = ({ children, value }) => (
  <StepContext.Provider value={value}>{children}</StepContext.Provider>
);

describe('StepContent', () => {
  let container;

  it('should render only if context is active', () => {
    ({ container } = render(
      <StepContextWrapper value={{ active: true }}>
        <StepContent>Content</StepContent>
      </StepContextWrapper>
    ));
    expect(container.querySelector('div.Stepper__StepContent')).toBeDefined();
  });

  it('should not render if context is not active', () => {
    ({ container } = render(
      <StepContextWrapper value={{ active: false }}>
        <StepContent>Content</StepContent>
      </StepContextWrapper>
    ));
    expect(container.querySelector('div.Stepper__StepContent')).toBeNull();
  });

  describe('props', () => {
    describe('showOnActive', () => {
      it('should render only if context is active', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: true }}>
            <StepContent showOnActive>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(
          container.querySelector('div.Stepper__StepContent')
        ).toBeDefined();
      });

      it('should not render if context is not active', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: false }}>
            <StepContent showOnActive>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(container.querySelector('div.Stepper__StepContent')).toBeNull();
      });
    });
    describe('hideOnActive', () => {
      it('should not render only if context is active', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: true }}>
            <StepContent hideOnActive>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(container.querySelector('div.Stepper__StepContent')).toBeNull();
      });

      it('should render if context is not active', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: false }}>
            <StepContent hideOnActive>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(
          container.querySelector('div.Stepper__StepContent')
        ).toBeDefined();
      });
    });
    describe('hideOnComplete', () => {
      it('should not render only if context is complete', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: true, complete: true }}>
            <StepContent hideOnComplete>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(container.querySelector('div.Stepper__StepContent')).toBeNull();
      });

      it('should render if context is not complete', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: true, complete: false }}>
            <StepContent hideOnComplete>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(
          container.querySelector('div.Stepper__StepContent')
        ).toBeDefined();
      });
    });
    describe('showOnComplete', () => {
      it('should render only if context is complete', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: true, complete: true }}>
            <StepContent showOnComplete>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(
          container.querySelector('div.Stepper__StepContent')
        ).toBeDefined();
      });

      it('should not render if context is not complete', () => {
        ({ container } = render(
          <StepContextWrapper value={{ active: true, complete: false }}>
            <StepContent showOnComplete>Content</StepContent>
          </StepContextWrapper>
        ));
        expect(container.querySelector('div.Stepper__StepContent')).toBeNull();
      });
    });
  });
});
