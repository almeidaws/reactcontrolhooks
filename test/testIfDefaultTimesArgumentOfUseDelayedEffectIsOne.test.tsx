import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestHowManyTimesUseDelayedEffectIsCalled from './src/TestHowManyTimesUseDelayedEffectIsCalled';
import { act } from 'react-dom/test-utils';

describe('it', () => {
  it('Test if default times argument of useDelayedEffect is one', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <TestHowManyTimesUseDelayedEffectIsCalled
          dependencies={[[1], [2], [3], [4], [5]]}
        />,
        div
      );
    });
    expect(div.textContent).toBe('4');
    ReactDOM.unmountComponentAtNode(div);
  });
});
