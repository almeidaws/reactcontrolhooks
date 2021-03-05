import { useState } from 'react';
import { Hook, HookParams, Neutralizable } from './Types';

function useFiredHook<P extends HookParams, R>(
  useDeferredHook: Hook<P, R>
): [(args: Neutralizable<P>) => void, R] {
  const [previousArgs, setPreviousArgs] = useState<
    Neutralizable<P> | undefined
  >(null);
  const result = useDeferredHook.apply(null, [previousArgs]);

  const fire = (innerArgs: Neutralizable<P>) => {
    if (innerArgs !== undefined) setPreviousArgs(innerArgs);
  };

  return [fire, result];
}

export default useFiredHook;
