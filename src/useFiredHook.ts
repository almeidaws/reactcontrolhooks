import { useState } from 'react';

function useFiredHook<P extends any, R>(
  useDeferredHook: (...r: P[]) => R,
  ...outerArgs: P[]
): [(...innerArgs: P[]) => void, R] {
  const [previousArgs, setPreviousArgs] = useState(Array<P | undefined>());
  const result = useDeferredHook.apply(
    null,
    previousArgs.length === 0 ? Array<any | null>(null) : previousArgs
  );

  const fire = (...innerArgs: P[]) => {
    if (innerArgs.length > 0) setPreviousArgs(innerArgs);
    else
      setPreviousArgs(
        outerArgs.length === 0 ? Array<P | undefined>(undefined) : outerArgs
      );
  };

  return [fire, result];
}

export default useFiredHook;
