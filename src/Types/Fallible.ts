type Fallible<R, E extends Error> = [R | null, E | null];
export default Fallible;
