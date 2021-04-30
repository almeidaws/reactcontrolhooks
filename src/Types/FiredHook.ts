import Neutralizable from './Neutralizable';
import HookParams from './HookParams';
type FiredHook<P extends HookParams, R> = (
  args?: Neutralizable<P>
) => { fire: (args?: Neutralizable<P>) => void; result: R };
export default FiredHook;
