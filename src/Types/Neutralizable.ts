import Some from './Some';
import Nothing from './Nothing';
import Ignore from './Ignore';
import HookParams from './HookParams';

type Neutralizable<T extends HookParams> = Some<T> | Nothing | Ignore;
export default Neutralizable;
