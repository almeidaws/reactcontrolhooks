import Neutralizable from './Neutralizable';
import Fallible from './Fallible';
import HookParams from './HookParams';
type FallibleHook<P extends HookParams, R, E extends Error> = (
  args: Neutralizable<P>
) => Fallible<R, E>;
export default FallibleHook;
