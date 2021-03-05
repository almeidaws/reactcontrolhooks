import Neutralizable from './Neutralizable';
import HookParams from './HookParams';
type FiredHook<P extends HookParams, R> = (
  args?: Neutralizable<P>
) => [(args?: Neutralizable<P>) => void, R];
export default FiredHook;
