import useFiredHook from './useFiredHook';
import useIterate from './useIterate';
import { FallibleHook, HookParams, Neutralizable } from './Types';

const useFiredIterate = <P extends HookParams, R, E extends Error>(
  hook: FallibleHook<P, R, E>,
  buffer: number
): {
  fire: (args?: Neutralizable<Neutralizable<P>[]>) => void;
  result: { results: R[] | null; errors: E[] | null };
} => {
  const useIterateOverHook = (args?: Neutralizable<Neutralizable<P>[]>) => {
    return useIterate(hook, args, buffer);
  };
  return useFiredHook(useIterateOverHook);
};

export default useFiredIterate;
