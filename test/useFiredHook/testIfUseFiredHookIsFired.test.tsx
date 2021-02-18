import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Neutralizable } from '../../src';
import TestUseFiredHook from '../Components/TestUseFiredHook';

const useFoo = (arg: Neutralizable<{ name: string }>) => arg?.name;

describe('it', () => {
  it('Test if useFiredHook is fired', () => {
    const div = document.createElement('div');
    let retrievedFire:
      | null
      | ((arg?: Neutralizable<{ name: string }>) => void) = null;

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
      retrievedFire?.();
    });

    expect(div.textContent).toBe('7');
    ReactDOM.unmountComponentAtNode(div);
  });
});
