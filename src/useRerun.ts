import { useState } from 'react';

function useRerun<P, R, S extends (...r: P[]) => R>(
  hook: S,
  ...args: P[]
): [() => void, R] {
  const [active, setActive] = useState(0);
  const firstResult = hook.apply(
    null,
    active === 0 ? args : Array<any | null>(null)
  );
  const secondResult = hook.apply(
    null,
    active === 1 ? args : Array<any | null>(null)
  );

  // console.log(`active: ${active}`);

  const rerun = () => {
    setActive(active === 0 ? 1 : 0);
  };

  return [rerun, active === 0 ? firstResult : secondResult];
}

export default useRerun;
