import * as React from 'react';
import { Hook, Neutralizable, useFiredHook } from '../../src';

const TestUseFiredHook = <P extends object, R>(props: {
  useDeferredHook: Hook<P, R>;
  outerArgs: Neutralizable<P>[];
  getFire?: (fire: (arg?: Neutralizable<P>) => void) => void;
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
