import * as React from 'react';
import { useDelayedEffect } from '../../src';

const TestHowManyTimesUseDelayedEffectIsCalled = (props: {
  dependencies: any[][];
  times?: number;
}) => {
  const [state, setState] = React.useState(0);
  const [dependency, setDependency] = React.useState(props.dependencies[0]);
  React.useEffect(() => {
    if (state + 1 < props.dependencies.length) {
      setDependency(props.dependencies[state + 1]);
    }
  }, [state]);
  useDelayedEffect(
    () => {
      setState(state + 1);
    },
    dependency,
    props.times
  );
  return <div>{state}</div>;
};

export default TestHowManyTimesUseDelayedEffectIsCalled;
