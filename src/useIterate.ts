import { FallibleHook, HookParams, Neutralizable } from './Types';

const useIterate = <P extends HookParams, R extends object, E extends Error>(
  hook: FallibleHook<P, R, E>,
  args: Neutralizable<Neutralizable<P>[]> | undefined,
  buffer: number
): { results: R[] | null; errors: E[] | null } => {
  if (buffer <= 0)
    throw new Error(
      `Buffer size at useIterate must be greater than or equal to 1, but it's ${buffer}`
    );

  const returns = Array.from({ length: buffer }, (_value, index) =>
    hook.apply(
      null,
      args !== null &&
        args !== undefined &&
        index < args.length &&
        args.length <= buffer
        ? [args[index]]
        : [null]
    )
  ).slice(0, buffer);
  if (((args && args.length) || 0) > buffer)
    return { results: [], errors: null };
  const errors = returns
    .map(({ error }) => error)
    .filter(error => error !== null) as E[];
  if (errors.length > 0) return { results: null, errors };

  const results = returns
    .map(({ result }) => result)
    .filter(result => result !== null) as R[];
  return { results, errors: null };
};

export default useIterate;
