import { useState, useEffect } from "react";

const useDelayedEffect = (effect, dependencies, times = 1) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < times) {
      setCount(count + 1);
      return;
    }

    return effect();
  }, dependencies);
};

export default useDelayedEffect;
