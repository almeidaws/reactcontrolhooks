type Fallible<R, E extends Error> = { result: R | null; error: E | null };
export default Fallible;
