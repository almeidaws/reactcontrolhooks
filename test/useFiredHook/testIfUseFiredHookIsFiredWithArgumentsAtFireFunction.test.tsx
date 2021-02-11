import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestUseFiredHook from '../Components/TestUseFiredHook';

const useFoo = (arg: string | null) => arg;

describe('it', () => {
  it('Test if useFiredHook is fired with arguments at fire function', () => {
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
      retrievedFire?.('foo');
    });

    expect(div.textContent).toBe('foo');
    ReactDOM.unmountComponentAtNode(div);
  });
});
