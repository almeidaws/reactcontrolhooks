import Neutralizable from './Neutralizable';
type FiredHook<P extends object, R> = (
  args: Neutralizable<P>
) => [(args: Neutralizable<P>) => void, R];
export default FiredHook;
