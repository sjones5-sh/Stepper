# Stepper
`Stepper` and its sub components where inspired by 2 community based components.
- [`react-albus`](https://github.com/americanexpress/react-albus) for its wizard style implementation
- [`@material-ui/core/Stepper`](https://material-ui.com/components/steppers/#vertical-stepper) For is vertical stepper

Concepts from both have been implemented but `Stepper` is heavily based on `react-albus`

## Demo
See examples here: https://sjones5-sh.github.io/Stepper/

## API
### `<Stepper>`
#### props
##### `history`: object *(optional)*
##### `basename`: string *(optional)*
For use with `history`. Configures the base path for the `Stepper` so that routing is preserved.

##### `exactMatch`: boolean
allows for `startWith` matching on rout changes

##### `wizard`: boolean *default: false*
There are 2 modes of using `Stepper`
- **stepper** *(default)*
- **wizard**

By default `Stepper` will act as a stepper.
The difference between the modes is that a stepper will keep all `Step`s in the DOM and will apply classes the content.
This gives presentation control to the implementor to hide / show / style the steps as desired.
See [`<Step>`](#Step) for more

In `wizard` mode the `Step`'s children are mounted and unmounted when presented.

##### `onNext(wizard)`: function *(optional)*
A function that will be called by `<Stepper>` to determine the next step to proceed to.

##### Params

* `wizard` (object): The [`context.wizard`](#contextwizard) object.

If you do not pass an `onNext` prop, `<Wizard>` will proceed directly to the next step.

##### `render(wizard)`: function *(optional)*
A function that will be used as the render function of `<Wizard>`.

##### Params
* `wizard` (object): The [`context.wizard`](#contextwizard) object.
---

### `context.wizard`
`<Stepper>` provides an object on context with the following properties:

* `step` (object): Describes the current step with structure: `{ id: string }`.
* `steps` (array): Array of `step` objects in the order they were declared within `<Steps>`.
* `history` (object): The backing [`history`](https://github.com/ReactTraining/history#properties) object.
* `next()` (function): Moves to the next step in order.
* `previous()` (function): Moves to the previous step in order.
* `go(n)` (function): Moves `n` steps in history.
* `push(id)` (function): Pushes the step with corresponding `id` onto history.
* `replace(id)` (function): Replaces the current step in history with the step with corresponding `id`.
* `set(id)` (function): Move to step `id`.
---

### `<Steps>`
Wraps all of the `<Step>` components in your journey.  The only direct children of `<Steps>` should be `<Step>` components.

#### Props
##### `step`: object ***(optional)***
An object describing the current step with the structure: `{ id: string }`.  Defining a `step` prop will make `<Steps>` a [controlled component](https://facebook.github.io/react/docs/forms.html).

#### Example
Controlled
```js
<Stepper
  render={({step}) => (
    <Steps key={step.id} step={step}>
      <Step id={"Step1"} />
  ...
```
Uncontrolled
```js
<Stepper>
  <Steps>
    <Step id={"Step1"} />
    ...
```
------

### `<Step>`

Wraps all the content that will be rendered or conditionally shown when the step is active.

#### CSS Classes
- `Stepper__Step`
- `Stepper__Step--active`: props.active
- `Stepper__Step--complete`: props.complete
- `Stepper__Step--disabled`: props.disabled
- `Stepper__Step--first`: props.first
- `Stepper__Step--last`: props.last
- `Stepper__Step--error`: props.error

#### Props

##### `id`: string

Unique key for each step.

In addition to `id`, any additional props added to `<Step>` will be available on each `step` object.  This can be used to add names, descriptions, or other metadata to each step.

##### boolean props
- `active`
- `complete`
- `disabled`
- `first`
- `last`
- `error`

##### `onClick`: function *(optional)*
applies click handler to `Step` wrapping `div`
function is called with arguments `wizard`, `props`
```js
const onClick = (wizard, {active, complete, ...props}) => {...}
```

##### `onOpen`: function *(optional)*
Fires when `active` changes to `true`
function is called with arguments `wizard`, `props`
```js
const onOpen = (wizard, {active, complete, ...props}) => {...}
```

##### `onClose`: function *(optional)*
Fires when `active` changes to `false`
function is called with arguments `wizard`, `props`
```js
const onClose = (wizard, {active, complete, ...props}) => {...}
```

##### `className`: string
applies `className` to `Step` wrapping `div`

##### `render`: function({wizard, ...props}) *(optional)*
optional render method to custom render instead of declaration

##### `children`: ReactElements | function({wizard, ...props})
Optional to supply render function to custom render instead of declaration.
Otherwise `children` works as you would expect.

#### Example
```js
  <Step
    id={"Step1"}
    complete={completeSteps["Step1"]}
    onClick={handleStepSelect}
  >
    <StepHead>Base 1</StepHead>
    <StepContent collapsible>Step 1 Content</StepContent>
  </Step>
  <Step
    id={'Custom-Step-1'}
    error={true}
    render={({wizard, active, error, ...props}) => active && error ? (
      <div {...props}>😱</div>
    ) : null}
    onClick={handleStepSelect}
  />
  <Step
    id={'Custom-Step-2'}
    complete={true}
    onClick={handleStepSelect}
  >
    {({wizard, complete, ...props}) => complete ? (
      <div {...props}>
        ✅
        <button onClick={wizard.next}>NEXT</button>
      </div>
     ) : null}
  </Step>

```

---
### `<StepContent>`
Semantic marker for Content in the `<Step>`. provides API for conditional hiding and show based on the state of the Step.
Also allows for Tansitions.

#### props

##### `showOnActive`: boolean
Renders the content only when Ancestor `<Step>` is `active`.
Defaults to `true` only if `hideOnActive` is `undefined`.

##### `hideOnActive`: boolean
Hides the content only when Ancestor `<Step>` is `active`

##### `showOnComplete`: boolean
Renders the content only when Ancestor `<Step>` is `complete`

##### `hideOnComplete`: boolean
Hides the content only when Ancestor `<Step>` is `complete`

##### `show`: boolean
Control that overrides any and all hide/show props mentioned above.

##### `collapsible`: boolean
Enables a `@material-ui/core/Collapse` for the `TransitionComponent` to animate the hide/show

##### `TransitionComponent`: [`react-transition-group/CSSTransition`, `@material-ui/core/Collapse`, ...]
This is the root of the content and should be some kind of transistion component. Default is `react-transition-group/CSSTransition` unless `collapsible` is set in which case the default will be `@material-ui/core/Collapse`.

##### `timeout`: boolean
applied to the `TransitionComponent`

##### `...props`: remaining props
Any remaining props are applied to the root `TransitionComponent`. See [CSSTransition](http://reactcommunity.org/react-transition-group/css-transition) for more.

#### Example
```js
<StepContent showOnActive>🏃‍♂️</StepContent>
<StepContent hideOnActive>👻</StepContent>
<StepContent hideOnComplete>🚀</StepContent>
<StepContent showOnComplete>✅</StepContent>
<StepContent showOnComplete hideOnActive>✅👻</StepContent>
<StepContent show={step.error}>Error content</StepContent>

<StepContent collapsible>Tall content</StepContent>

```

---
### `<StepHead>`
Semantic marker for Header content in the `<Step>`. provides API for conditional hiding and show based on the state of the Step.
Also allows for Tansitions. Inherits from  [`<StepContent>`](#<StepContent>) but is always presented by default.

#### Example
```js
<StepHead>this content will always show</StepHead>
<StepHead showOnActive>🏃‍♂️</StepHead>
<StepHead hideOnActive>👻</StepHead>
<StepHead hideOnComplete>🚀</StepHead>
<StepHead showOnComplete>✅</StepHead>
<StepHead showOnComplete hideOnActive>✅👻</StepHead>
<StepHead show={step.error}>Error content</StepHead>
```
---

### `<WithWizard>`
A component that provides a `render` function providing [`context.wizard`](#contextwizard) as argument.
Useful for rendering navigation components like progress bars, next/prev buttons, or breadcrumbs.

#### Example
```js
<WithWizard
  render={(wizard) => (
    <>
      {wizard.steps.map(step => (
        <span onClick={() => wizard.set(step.id)}>{step.id}</span>
      )}
      <ProgressBar 
        value={wizard.steps.filter(step => step.complete).length / wizard.steps.length} />
      <button onClick={wizard.previous}>Prev</button>
      <button onClick={wizard.next}>Next</button>
    </>
  )} />
```
---
### `withWizard()`
A higher order component that adds [`context.wizard`](#contextwizard) as a `wizard` prop on the wrapped component.

---
