import Neutralizable from './Neutralizable';
import Fallible from './Fallible';
type FallibleHook<P extends object, R, E extends Error> = (
  args: Neutralizable<P>
) => Fallible<R, E>;
export default FallibleHook;
