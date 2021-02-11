import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestUseDelayedEffect from '../Components/TestUseDelayedEffect';
import { act } from 'react-dom/test-utils';

describe('it', () => {
  it('useDelayedEffect calls effect twice', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <TestUseDelayedEffect dependencies={[[1], [2]]} times={0} />,
        div
      );
    });
    expect(div.textContent).toBe('2');
    ReactDOM.unmountComponentAtNode(div);
  });
});
