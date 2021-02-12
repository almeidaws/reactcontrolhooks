import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestUseRerun from '../Components/TestUseRerun';

const useFoo = (arg: string | null) => arg;

describe('it', () => {
  it('Test if useRerun runs automatically at the first time', () => {
    const div = document.createElement('div');

    act(() => {
      ReactDOM.render(<TestUseRerun hook={useFoo} outerArgs={['5']} />, div);
    });

    expect(div.textContent).toBe('5');
    ReactDOM.unmountComponentAtNode(div);
  });
});
