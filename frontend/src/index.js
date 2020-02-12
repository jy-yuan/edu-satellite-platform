import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Layouts from './pages/Layouts';
import Home from './home';

class App extends React.Component {
  render() {
    console.log = (function (oriLogFunc) {
      return function () {
      }
    })(console.log);
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/registerpage" component={Home} />
        <Route path="/mainpage" component={Layouts} />
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
