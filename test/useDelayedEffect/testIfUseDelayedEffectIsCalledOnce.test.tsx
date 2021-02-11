import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestUseDelayedEffect from '../Components/TestUseDelayedEffect';
import { act } from 'react-dom/test-utils';

describe('it', () => {
  it('useDelayedEffect calls effect once', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <TestUseDelayedEffect dependencies={[[1], [2]]} times={1} />,
        div
      );
    });
    expect(div.textContent).toBe('1');
    ReactDOM.unmountComponentAtNode(div);
  });
});
