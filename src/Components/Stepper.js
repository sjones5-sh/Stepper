import React from 'react';
import classnames from 'classnames';

import { Component } from 'react';
import PropTypes from 'prop-types';
import { createMemoryHistory } from 'history';

import renderCallback from '../utils/commonRender';
import {StepperContext} from "../utils/useStepper";

class Wizard extends Component {
  state = {
    step: {
      id: null
    },
    steps: []
  };

  get wizard() {
    return {
      go: this.history.go,
      set: this.set,
      history: this.history,
      init: this.init,
      next: this.next,
      previous: this.previous,
      push: this.push,
      replace: this.replace,
      urlForStep: this.urlForStep,
      ...this.state,
      flow: this.props.wizard ? 'wizard' : 'stepper',
      nonLinear: this.props.nonLinear
    };
  }

  componentDidMount() {
    this.unlisten = this.history.listen(({ pathname }) =>
      this.setState({ step: this.pathToStep(pathname) })
    );

    if (this.props.onNext) {
      const { init, ...wizard } = this.wizard;
      this.props.onNext(wizard);
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  get basename() {
    return `${this.props.basename}/`;
  }

  get ids() {
    return this.state.steps.map((s) => s.id);
  }

  get nextStep() {
    return this.ids[this.ids.indexOf(this.state.step.id) + 1];
  }

  get previousStep() {
    return this.ids[this.ids.indexOf(this.state.step.id) - 1];
  }

  history = this.props.history || createMemoryHistory();
  steps = [];

  pathToStep = (pathname) => {
    const id = pathname.replace(this.basename, '');
    const [step] = this.state.steps.filter((s) =>
      this.props.exactMatch ? s.id === id : id.startsWith(s.id)
    );

    return step || this.state.step;
  };

  init = (steps) => {
    this.setState({ steps }, () => {
      const step = this.pathToStep(this.history.location.pathname);
      if (step.id && this.state.steps.includes(step)) {
        this.setState({ step });
      } else {
        this.replace(this.ids[0]);
      }
    });
  };

  set = (step) => this.history.push(this.urlForStep(step));
  push = (step = this.nextStep) => this.set(step);
  replace = (step = this.nextStep) =>
    this.history.replace(this.urlForStep(step));
  pushPrevious = (step = this.previousStep) => this.set(step);
  urlForStep = (step) =>
    `${this.basename}${step}${this.history.location.search}${this.history.location.hash}`;

  next = () => {
    if (this.props.onNext) {
      this.props.onNext(this.wizard);
    } else {
      this.push();
    }
  };

  previous = () => {
    this.pushPrevious();
  };

  render() {
    return (
      <StepperContext.Provider value={this.wizard}>
        {renderCallback(this.props, this.wizard)}
      </StepperContext.Provider>
    );
  }
}

Wizard.propTypes = {
  nonLinear: PropTypes.bool,
  basename: PropTypes.string,
  history: PropTypes.shape({
    entries: PropTypes.array,
    go: PropTypes.func,
    goBack: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  onNext: PropTypes.func,
  exactMatch: PropTypes.bool,
  wizard: PropTypes.bool
};

Wizard.defaultProps = {
  nonLinear: false,
  basename: '',
  history: null,
  onNext: null,
  render: null,
  exactMatch: true,
  wizard: false
};

const Stepper = (props) => (
  <div
    className={classnames('Stepper', props.className, {
      [`Stepper--wizard`]: props.wizard
    })}>
    <Wizard exactMatch={false} {...props} />
  </div>
);

export default Stepper;
