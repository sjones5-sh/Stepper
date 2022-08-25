import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StepperContext } from './Stepper';

export const StepContext = React.createContext({
  active: false
});

const Step = (props) => (
  <StepperContext.Consumer>
    {(wizard) => <StepView wizard={wizard} {...props} />}
  </StepperContext.Consumer>
);
const StepView = ({
  render,
  classes = {},
  children: childrenProp,
  onClick,
  setActiveOnClick,
  onClose = () => {},
  onOpen = () => {},
  wizard,
  ...props
}) => {
  useEffect(() => {
    if (!props.active) {
      onClose(wizard, props);
    } else {
      onOpen(wizard, props);
    }
  }, [props.active]); /* eslint-disable-line react-hooks/exhaustive-deps */
  let children;
  if (typeof render === 'function') {
    children = render({ wizard, onClick, ...props });
  } else if (typeof childrenProp === 'function') {
    children = childrenProp({ wizard, onClick, ...props });
  } else {
    children = (
      <div
        className={classnames(classes.root, 'Stepper__Step', props.className, {
          [classes.active || 'Stepper__Step--active']: props.active,
          [classes.complete || 'Stepper__Step--complete']: props.complete,
          [classes.disabled || 'Stepper__Step--disabled']:
            !props.active && props.disabled,
          [classes.first || 'Stepper__Step--first']: props.first,
          [classes.last || 'Stepper__Step--last']: props.last,
          [classes.error || 'Stepper__Step--error']: props.error
        })}
        onClick={() => {
          if (setActiveOnClick && !props.disabled && !props.active) {
            wizard.set(props.id);
          }
          if (typeof onClick === 'function') {
            onClick(wizard, props);
          }
        }}>
        {childrenProp}
      </div>
    );
  }

  return <StepContext.Provider value={props}>{children}</StepContext.Provider>;
};

Step.propTypes = {
  id: PropTypes.string,
  wizard: PropTypes.object,
  classes: PropTypes.shape({
    root: PropTypes.string,
    active: PropTypes.string,
    complete: PropTypes.string,
    disabled: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
    error: PropTypes.string
  }),
  render: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node,
    PropTypes.symbol
  ]),
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  setActiveOnClick: PropTypes.bool
};

export default Step;
