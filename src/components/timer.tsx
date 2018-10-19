import * as React from 'react';
import { observer } from 'mobx-react';
import { appStore } from '../stores';

import './layout.css';

@observer
export class Timer extends React.Component {

  render() {
    const { remainingTime } = appStore;
    return (
      <div className="timer">
        Time left: {remainingTime}s
      </div>
    );
  }
}
