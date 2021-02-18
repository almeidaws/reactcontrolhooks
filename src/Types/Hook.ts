import Neutralizable from './Neutralizable';
type Hook<P extends object, R> = (args: Neutralizable<P>) => R;
export default Hook;
