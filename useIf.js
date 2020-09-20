import { useEffect } from "react";

const useIf = (predicate, ifTrue, ifFalse) => {
  const evaluatedPredicate = !!(typeof predicate == "function"
    ? predicate()
    : predicate);
  useEffect(() => {
    if (evaluatedPredicate) ifTrue();
    else ifFalse && ifFalse();
  }, [evaluatedPredicate]);
};

export default useIf;
