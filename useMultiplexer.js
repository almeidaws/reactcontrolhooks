import { useState } from "react";

const useMultiplexer = (channels, turnedOffReturn = []) => {
  const [activeChannel, setActiveChannel] = useState(null);

  const results = channels.map(({ hook, args }, index) => {
    return hook.apply(
      null,
      activeChannel === index ? (Array.isArray(args) ? args : [args]) : [null]
    );
  });

  const multiplex = (channelOrFunction) => {
    if (typeof channelOrFunction === "function")
      setActiveChannel(channelOrFunction(activeChannel));
    else setActiveChannel(channelOrFunction);
  };

  return [
    activeChannel,
    multiplex,
    activeChannel !== null ? results[activeChannel] : turnedOffReturn,
  ];
};

export default useMultiplexer;
