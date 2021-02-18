import { useEffect } from 'react';
import { FiredHook, HookParams, Neutralizable } from './Types';

const useAutoFire = <P extends HookParams, R>(
  hook: FiredHook<P, R>,
  args: Neutralizable<P>
): R => {
  const [fire, result] = hook.apply(null, [args]);
  useEffect(() => {
    fire();
  }, [args]);
  return result;
};

export default useAutoFire;
