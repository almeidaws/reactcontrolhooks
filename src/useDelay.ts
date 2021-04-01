import useDelayedEffect from './useDelayedEffect';
import { DependencyList, useState } from 'react';

const useDelay = <V>(
  value: V,
  dependencies?: DependencyList,
  duration = 1000
): V => {
  const deps = dependencies ?? [value];
  const [delayedValue, setDelayedValue] = useState(value);
  useDelayedEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedValue(value);
    }, duration);
    return () => {
      clearTimeout(timeout);
    };
  }, [...deps, duration]);
  return delayedValue;
};

export default useDelay;
