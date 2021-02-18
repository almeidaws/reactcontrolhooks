import Some from './Some';
import Nothing from './Nothing';
import Ignore from './Ignore';

type Neutralizable<T extends object> = Some<T> | Nothing | Ignore;
export default Neutralizable;
