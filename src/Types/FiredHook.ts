import Neutralizable from './Neutralizable';
import HookParams from './HookParams';
type FiredHook<P extends HookParams, R extends object> = (
  args?: Neutralizable<P>
) => { fire: (args?: Neutralizable<P>) => void } & R;
export default FiredHook;
