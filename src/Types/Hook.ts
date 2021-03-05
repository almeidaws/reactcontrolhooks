import Neutralizable from './Neutralizable';
import HookParams from './HookParams';
type Hook<P extends HookParams, R> =
  | ((args?: Neutralizable<P>) => R)
  | ((args: Neutralizable<P>) => R);
export default Hook;
