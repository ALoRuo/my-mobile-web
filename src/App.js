import React, { Component } from 'react';
import logo from './logo.svg';
import { Button} from 'antd-mobile';
import './App.css';
import MainView from './component/MainView'

class App extends Component {
  render() {
    return (
      <div className="App">
          <MainView/>
          {/*<Button>start</Button>*/}
          {/*<Button type="primary">primary</Button>*/}
      </div>
    );
  }
}

export default App;
