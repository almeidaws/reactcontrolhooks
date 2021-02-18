import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Neutralizable } from '../../src';
import TestUseFiredHook from '../Components/TestUseFiredHook';

const useFoo = (arg: Neutralizable<{ name: string }>) => arg?.name;

describe('it', () => {
  it('Test if useFiredHook is fired with arguments at fire function', () => {
    const div = document.createElement('div');
    let retrievedFire:
      | null
      | ((args: Neutralizable<{ name: string }>) => void) = null;

    act(() => {
      ReactDOM.render(
        <TestUseFiredHook
          useDeferredHook={useFoo}
          outerArgs={[{ name: '7' }]}
          getFire={fire => (retrievedFire = fire)}
        />,
        div
      );
    });

    act(() => {
      retrievedFire?.({ name: 'foo' });
    });

    expect(div.textContent).toBe('foo');
    ReactDOM.unmountComponentAtNode(div);
  });
});
