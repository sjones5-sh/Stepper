import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const withWizard = (Component) => {
  const WithWizard = (props, { wizard: { init, ...wizard } }) =>
    React.createElement(Component, {
      wizard,
      ...props
    });

  WithWizard.contextTypes = {
    wizard: PropTypes.object
  };

  WithWizard.displayName = `withWizard(${
    Component.displayName || Component.name
  })`;
  WithWizard.WrappedComponent = Component;

  return hoistStatics(WithWizard, Component);
};

export default withWizard;
