import { useState } from 'react';
import { Fallible, FiredHook, HookParams } from './Types';
import useDelayedEffect from './useDelayedEffect';
import useSkippableEffect from './useSkippableEffect';

const useQueue = <P extends HookParams, R, E extends Error>(
  firedHook: FiredHook<P, Fallible<R, E>>
) => {
  const [fire, [result, error]] = firedHook();
  const [results, setResults] = useState(Array<R | null>());
  const [queue, setQueue] = useState(Array<P>());

  useDelayedEffect(() => {
    if (error !== null) return;
    if (queue.length === 0) return;
    const nextArg = queue[0];
    fire(nextArg);
  }, [queue]);

  useSkippableEffect(() => {
    if (error !== null) return;
    if (queue.length === 0) return;
    setQueue(queue.slice(1));
    setResults(prev => [...prev, result]);
  }, [result, error]);

  const enqueue = (arg: P) => {
    if (error !== null) return;
    setQueue(prev => [...prev, arg]);
  };

  return [enqueue, [results, error]];
};

export default useQueue;
