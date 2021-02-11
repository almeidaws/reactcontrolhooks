import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestUseSkippableEffect from '../Components/TestUseSkippableEffect';

describe('it', () => {
  it('Test if useSkippableEffect isn`t called for the first time', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<TestUseSkippableEffect dependencies={[[1]]} />, div);
    });
    expect(div.textContent).toBe('0');
    ReactDOM.unmountComponentAtNode(div);
  });
});
