import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestUseFiredHook from '../Components/TestUseFiredHook';
import { Neutralizable } from '../../src';

const useFoo = (arg: Neutralizable<string>) => arg;

describe('it', () => {
  it('Test if useFiredHook isnt Fired', () => {
    const div = document.createElement('div');

    act(() => {
      ReactDOM.render(
        <TestUseFiredHook useDeferredHook={useFoo} outerArgs={[null]} />,
        div
      );
    });
    expect(div.textContent).toBe('');
    ReactDOM.unmountComponentAtNode(div);
  });
});
