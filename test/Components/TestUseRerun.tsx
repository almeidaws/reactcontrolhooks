import * as React from 'react';
import { useRerun } from '../../src';

const TestUseRerun = <P extends any, R>(props: {
  hook: (...r: P[]) => R;
  outerArgs: P[];
  getRerun?: (rerun: () => void) => void;
}) => {
  const [rerun, result]: [() => void, R] = useRerun(
    props.hook,
    ...props.outerArgs
  );

  React.useEffect(() => {
    props.getRerun?.(rerun);
  }, []);

  return <div>{result}</div>;
};

export default TestUseRerun;
