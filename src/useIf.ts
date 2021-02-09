import { useEffect } from 'react';

const useIf = (
  predicate: boolean | (() => boolean),
  ifTrue: () => void,
  ifFalse?: () => void
): void => {
  const evaluatedPredicate = !!(typeof predicate == 'function'
    ? predicate()
    : predicate);
  useEffect(() => {
    if (evaluatedPredicate) ifTrue();
    else ifFalse?.();
  }, [evaluatedPredicate]);
};

export default useIf;
