import { useDelayedEffect, useSkippableEffect } from './index';
import { useState } from 'react';

type FiredHook<P extends any, R> = (
  ...r: P[]
) => [(...r: P[]) => void, [R, Error | null]];

const useQueue = <P extends any, R>(firedHook: FiredHook<P, R>) => {
  const [fire, [result, error]] = firedHook();
  const [results, setResults] = useState(Array<R>());
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
