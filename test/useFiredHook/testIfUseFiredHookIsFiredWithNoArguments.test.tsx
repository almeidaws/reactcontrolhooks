import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Neutralizable } from '../../src';
import TestUseFiredHook from '../Components/TestUseFiredHook';

const useFoo = (_arg: Neutralizable<{ name: string }>) => 'eae';

describe('it', () => {
  it('Test if useFiredHook is fired with no arguments', () => {
    const div = document.createElement('div');
    let retrievedFire:
      | null
      | ((args?: Neutralizable<{ name: string }>) => void) = null;

    act(() => {
      ReactDOM.render(
        <TestUseFiredHook
          useDeferredHook={useFoo}
          outerArgs={[]}
          getFire={fire => (retrievedFire = fire)}
        />,
        div
      );
    });

    act(() => {
      retrievedFire?.();
    });

    expect(div.textContent).toBe('eae');
    ReactDOM.unmountComponentAtNode(div);
  });
});
