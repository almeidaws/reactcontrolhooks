import { useState } from 'react';
import { Hook, HookParams, Neutralizable } from './Types';

function useRerun<P extends HookParams, R>(
  hook: Hook<P, R>,
  args: Neutralizable<P>
): [() => void, R] {
  const [active, setActive] = useState(0);
  const firstResult = hook.apply(null, active === 0 ? [args] : [null]);
  const secondResult = hook.apply(null, active === 1 ? [args] : [null]);

  const rerun = () => {
    setActive(active === 0 ? 1 : 0);
  };

  return [rerun, active === 0 ? firstResult : secondResult];
}

export default useRerun;
