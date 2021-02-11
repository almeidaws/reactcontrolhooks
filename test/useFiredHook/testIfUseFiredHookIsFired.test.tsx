import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestUseFiredHook from '../Components/TestUseFiredHook';

const useFoo = (arg: string | null) => arg;

describe('it', () => {
  it('Test if useFiredHook is fired', () => {
    const div = document.createElement('div');
    let retrievedFire: null | ((...args: string[]) => void) = null;

    act(() => {
      ReactDOM.render(
        <TestUseFiredHook
          useDeferredHook={useFoo}
          outerArgs={['7']}
          getFire={fire => (retrievedFire = fire)}
        />,
        div
      );
    });

    act(() => {
      retrievedFire?.();
    });

    expect(div.textContent).toBe('7');
    ReactDOM.unmountComponentAtNode(div);
  });
});
