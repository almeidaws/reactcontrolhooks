import { useState } from 'react';
import { Hook, HookParams, Neutralizable } from './Types';

function useRerun<P extends HookParams, R>(
  hook: Hook<P, R>,
  args: Neutralizable<P>,
  waitFor?: (result: R) => boolean
): [() => void, R] {
  const [active, setActive] = useState(0);
  const firstResult = hook.apply(null, active === 0 ? [args] : [null]);
  const secondResult = hook.apply(null, active === 1 ? [args] : [null]);

  const rerun = () => {
    setActive(active === 0 ? 1 : 0);
  };

  if (waitFor !== undefined)
    if (active === 0)
      if (waitFor(firstResult)) return [rerun, firstResult];
      else return [rerun, secondResult];
    else if (active === 1)
      if (waitFor(secondResult)) return [rerun, secondResult];
      else return [rerun, firstResult];

  return [rerun, active === 0 ? firstResult : secondResult];
}

export default useRerun;
