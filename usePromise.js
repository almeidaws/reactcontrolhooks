import { useState, useEffect } from "react";
import useRerun from "./useRerun";

const usePromise = (pipe, firstInput, ...hooks) => {
  const [currentHookIndex, setCurrentHookIndex] = useState(0);
  const [inputForCurrentHook, setInputForCurrentHook] = useState(null);
  const [firstOccuredError, setFirstOccuredError] = useState(null);
  const [reducedResult, setReducedResult] = useState(null);
  const results = hooks.map((hook, index) =>
    hook(currentHookIndex === index ? inputForCurrentHook : null)
  );
  const currentResult = results[currentHookIndex % hooks.length];
  const reduce = (newReducedResult) => setReducedResult(newReducedResult);

  useEffect(() => {
    setInputForCurrentHook(firstInput);
    setCurrentHookIndex(0);
    setFirstOccuredError(null);
    setReducedResult(null);
  }, [firstInput]);

  useEffect(() => {
    if (firstOccuredError !== null) return;
    if (firstInput === null) return;
    const [result, error] = currentResult;
    if (result !== null) {
      if (currentHookIndex < hooks.length - 1) {
        setCurrentHookIndex((prev) => prev + 1);
        const nextInput = pipe(reducedResult, result, currentHookIndex, reduce);
        setInputForCurrentHook(nextInput);
      } else {
        setCurrentHookIndex((prev) => prev + 1);
        pipe(reducedResult, result, currentHookIndex, reduce);
      }
    } else if (error !== null) setFirstOccuredError(error);
  }, currentResult);

  return [
    currentHookIndex >= hooks.length ? reducedResult : null,
    firstOccuredError,
  ];
};

export default usePromise;
