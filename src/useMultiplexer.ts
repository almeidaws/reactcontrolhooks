import { useState } from 'react';

interface Hook<P, R> {
  args: Array<P> | P;
  hook: (...args: P[]) => R;
}

const useMultiplexer = <P, R>(
  channels: Hook<P, R>[],
  turnedOffReturn: R
): [number | null, (arg: number) => void, R] => {
  const [activeChannel, setActiveChannel] = useState(null as number | null);

  const results = channels.map(({ hook, args }, index) => {
    return hook.apply(
      null,
      activeChannel === index
        ? Array.isArray(args)
          ? args
          : [args]
        : Array<any>(null)
    );
  });

  const multiplex = (
    channelOrFunction: ((arg: number | null) => number) | number
  ) => {
    if (typeof channelOrFunction === 'function')
      setActiveChannel(channelOrFunction(activeChannel));
    else setActiveChannel(channelOrFunction);
  };

  return [
    activeChannel,
    multiplex,
    activeChannel !== null ? results[activeChannel] : turnedOffReturn,
  ];
};

export default useMultiplexer;
