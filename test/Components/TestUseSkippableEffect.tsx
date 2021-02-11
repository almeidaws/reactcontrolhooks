import * as React from 'react';
import { useSkippableEffect } from '../../src';

const TestUseSkippableEffect = (props: {
  dependencies: any[][];
  times?: number;
  ignoredValues?: Array<any>;
}) => {
  const [state, setState] = React.useState(0);
  const [dependency, setDependency] = React.useState(props.dependencies[0]);
  const [skippableDependency, setSkippableDependency] = React.useState(0);

  React.useEffect(() => {
    if (state + 1 < props.dependencies.length) {
      setDependency(props.dependencies[state + 1]);
    }
  }, [state]);

  React.useEffect(() => {
    setState(state + 1);
  }, dependency);

  useSkippableEffect(
    () => {
      setSkippableDependency(skippableDependency + 1);
    },
    dependency,
    props.ignoredValues,
    props.times
  );
  return <div>{skippableDependency}</div>;
};

export default TestUseSkippableEffect;
