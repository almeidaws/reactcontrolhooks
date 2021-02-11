import * as React from 'react';
import { useFiredHook } from '../../src';

const TestUseFiredHook = <P extends any, R>(props: {
  useDeferredHook: (...r: P[]) => R;
  outerArgs: P[];
  getFire?: (fire: (...args: P[]) => void) => void;
}) => {
  const [fire, result] = useFiredHook(
    props.useDeferredHook,
    ...props.outerArgs
  );

  React.useEffect(() => {
    props.getFire?.(fire);
  }, []);

  return <div>{result}</div>;
};

export default TestUseFiredHook;
