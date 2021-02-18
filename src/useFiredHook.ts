import { useState } from 'react';
import { Hook, HookParams, Neutralizable } from './Types';

function useFiredHook<P extends HookParams, R>(
  useDeferredHook: Hook<P, R>,
  outerArgs?: Neutralizable<P>
): [(innerArgs?: Neutralizable<P>) => void, R] {
  const [previousArgs, setPreviousArgs] = useState<Neutralizable<P>>(undefined);
  const result = useDeferredHook.apply(null, [previousArgs]);

  const fire = (innerArgs?: Neutralizable<P>) => {
    if (innerArgs !== undefined) setPreviousArgs(innerArgs);
    else setPreviousArgs(outerArgs);
  };

  return [fire, result];
}

export default useFiredHook;
