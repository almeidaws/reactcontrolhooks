import useFiredHook from './useFiredHook';
import useIterate from './useIterate';

const useFiredIterate = <P, R extends [any, any], S extends (...r: P[]) => R>(
  hook: S,
  args: Array<P[]> | null,
  buffer: number
) => {
  const useIterateOverHook = (args: Array<P[]> | null) => {
    return useIterate(hook, args, buffer);
  };
  return useFiredHook(useIterateOverHook, args);
};

export default useFiredIterate;
