import { useState, useMemo, useEffect, SetStateAction } from 'react';
import useDelayedEffect from './useDelayedEffect';

const useSkippableEffect = (
  effect: () => void,
  dependencies: any[],
  ignoredValues = Array<any>(),
  times = 1
) => {
  const [prevDependencies, setPrevDependencies] = useState(dependencies);
  const mergedDependencies = useMemo(
    () =>
      dependencies.map((dep, index) =>
        ignoredValues.includes(dep) ? prevDependencies[index] : dep
      ),
    [...dependencies, ...ignoredValues]
  );

  useEffect(() => {
    setPrevDependencies(mergedDependencies as SetStateAction<any[]>);
  }, [mergedDependencies]);

  useDelayedEffect(
    () => {
      return effect();
    },
    mergedDependencies,
    times
  );
};

export default useSkippableEffect;
