const useIterate = <P, R extends [any, any], S extends (...r: P[]) => R>(
  hook: S,
  args: Array<P[]> | null,
  buffer: number
) => {
  if (buffer <= 0)
    throw new Error(
      `Buffer size at useIterate must be greater than or equal to 1, but it's ${buffer}`
    );

  if (args !== null) {
  }

  const returns = Array.from({ length: buffer }, (_value, index) =>
    hook.apply(
      null,
      args !== null && index < args.length && args.length <= buffer
        ? Array<P[]>(args[index])
        : Array<any | null>(null)
    )
  ).slice(0, buffer);
  if (((args && args.length) || 0) > buffer) return [[], null];
  const errors = returns.filter(([, error]) => error !== null);
  if (errors.length > 0) return [null, errors];

  const results = returns
    .map(([result]) => result)
    .filter(result => result !== null);
  return [results, null];
};

export default useIterate;
