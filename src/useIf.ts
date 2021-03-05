import { EffectCallback, useEffect } from 'react';

const useIf = (
  predicate: boolean | (() => boolean),
  ifTrue: EffectCallback,
  ifFalse?: EffectCallback
): void => {
  const evaluatedPredicate =
    typeof predicate == 'function' ? predicate() : predicate;
  useEffect(() => {
    if (evaluatedPredicate) return ifTrue();
    else return ifFalse?.();
  }, [evaluatedPredicate]);
};

export default useIf;
