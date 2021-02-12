import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestUseRerun from '../Components/TestUseRerun';

const useFoo = (arg: string | null) => {
  const [state, setState] = React.useState(0);
  React.useEffect(() => {
    setState(state + 1);
  }, [arg]);
  return state;
};

describe('it', () => {
  it('Test if useRerun runs again', () => {
    const div = document.createElement('div');
    let retrievedRerun: null | (() => void) = null;

    act(() => {
      ReactDOM.render(
        <TestUseRerun
          hook={useFoo}
          outerArgs={['5']}
          getRerun={rerun => (retrievedRerun = rerun)}
        />,
        div
      );
    });

    act(() => {
      retrievedRerun?.();
    });

    expect(div.textContent).toBe('2');
    ReactDOM.unmountComponentAtNode(div);
  });
});
