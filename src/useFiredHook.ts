import { useState } from 'react';

function useFiredHook<P extends any, R>(
  useDeferredHook: (...r: P[]) => R,
  ...outerArgs: P[]
) {
  const [previousArgs, setPreviousArgs] = useState(Array<P>());
  const result = useDeferredHook.apply(
    null,
    previousArgs.length === 0 ? Array<any | null>(null) : previousArgs
  );

  const fire = (...innerArgs: P[]) => {
    if (innerArgs.length > 0) setPreviousArgs(innerArgs);
    else setPreviousArgs(outerArgs);
  };

  return [fire, result];
}

export default useFiredHook;
