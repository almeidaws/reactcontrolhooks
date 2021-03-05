import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Neutralizable } from '../../src';
import TestUseFiredHook from '../Components/TestUseFiredHook';

const useFoo = (name: Neutralizable<string>) => name;

describe('it', () => {
  it('Test if useFiredHook is fired', () => {
    const div = document.createElement('div');
    let retrievedFire: null | ((arg?: Neutralizable<string>) => void) = null;

    act(() => {
      ReactDOM.render(
        <TestUseFiredHook
          useDeferredHook={useFoo}
          outerArgs={['7'] as string[]}
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
