import { useEffect } from 'react';

const useAutoFire = <
  P,
  R,
  S extends (...r: P[]) => [(...innerArgs: P[]) => void, R]
>(
  hook: S,
  ...args: P[]
): R => {
  const [fire, result] = hook.apply(null, args);
  useEffect(() => {
    fire();
  }, args);
  return result;
};

export default useAutoFire;
