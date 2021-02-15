import { useState } from 'react';
import { Hook, HookArgs } from './Types';

function useFiredHook<P, R>(
  useDeferredHook: Hook<P, R>,
  ...outerArgs: HookArgs<P>
): [(...innerArgs: HookArgs<P>) => void, R] {
  const [previousArgs, setPreviousArgs] = useState(Array<P | undefined>());
  const result = useDeferredHook.apply(
    null,
    previousArgs.length === 0 ? Array<any | null>(null) : previousArgs
  );

  const fire = (...innerArgs: HookArgs<P>) => {
    if (innerArgs.length > 0) setPreviousArgs(innerArgs);
    else
      setPreviousArgs(
        outerArgs.length === 0 ? Array<P | undefined>(undefined) : outerArgs
      );
  };

  return [fire, result];
}

export default useFiredHook;
