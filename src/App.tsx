import * as React from 'react';
import { Provider } from 'mobx-react';
import { Layout } from './components/layout';

import { appStore } from './stores';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <Provider appStore={appStore}>
        <div className="App">
          <Layout />
        </div>
      </Provider>
    );
  }
}

export default App;
