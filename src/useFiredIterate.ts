import useFiredHook from './useFiredHook';
import useIterate from './useIterate';
import { FallibleHook, HookParams, Neutralizable } from './Types';

const useFiredIterate = <P extends HookParams, R, E extends Error>(
  hook: FallibleHook<P, R, E>,
  args: Neutralizable<P>[],
  buffer: number
): [
  (args: Neutralizable<Neutralizable<P>[]>) => void,
  [R[] | null, E[] | null]
] => {
  const useIterateOverHook = (args: Neutralizable<Neutralizable<P>[]>) => {
    return useIterate(hook, args, buffer);
  };
  return useFiredHook(useIterateOverHook, args);
};

export default useFiredIterate;
