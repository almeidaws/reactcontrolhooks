import { useState } from 'react';
import { Hook, HookParams, Neutralizable } from './Types';

interface MultiplexedHook<P extends HookParams, R> {
  args: Neutralizable<P>;
  hook: Hook<P, R>;
}

const useMultiplexer = <P extends HookParams, R>(
  channels: MultiplexedHook<P, R>[],
  turnedOffReturn: R
): [number | null, (arg: number) => void, R] => {
  const [activeChannel, setActiveChannel] = useState(null as number | null);

  const results = channels.map(({ hook, args }, index) => {
    return hook.apply(null, activeChannel === index ? [args] : [null]);
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
