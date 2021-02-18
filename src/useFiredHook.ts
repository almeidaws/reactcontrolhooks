import { useState } from 'react';
import { Neutralizable } from './Types';

type Hook<P extends object, R> = (args: Neutralizable<P>) => R;

function useFiredHook<P extends object, R>(
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
