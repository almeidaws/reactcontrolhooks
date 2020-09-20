import { useDelayedEffect, useSkippableEffect } from ".";
import { useState } from "react";

const useQueue = (firedHook) => {
  const [fire, [result, error]] = firedHook();
  const [results, setResults] = useState([]);
  const [queue, setQueue] = useState([]);

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
    setResults((prev) => [...prev, result]);
  }, [result, error]);

  const enqueue = (arg) => {
    if (error !== null) return;
    setQueue((prev) => [...prev, arg]);
  };

  return [enqueue, [results, error]];
};

export default useQueue;
