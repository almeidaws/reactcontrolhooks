import Some from './Some';
import HookParams from './HookParams';
import Neutralize from './Neutralize';

type Neutralizable<T extends HookParams> = Some<T> | Neutralize;
export default Neutralizable;
