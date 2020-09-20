import { useState } from "react";

const useFiredHook = (useDeferredHook, ...outerArgs) => {
  const [previousArgs, setPreviousArgs] = useState([null]);
  const result = useDeferredHook.apply(null, previousArgs);

  const fire = (...innerArgs) => {
    if (innerArgs.length > 0) setPreviousArgs(innerArgs);
    else setPreviousArgs(outerArgs);
  };

  return [fire, result];
};

export default useFiredHook;
