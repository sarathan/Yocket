import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';


import './App.css';

const App = () => {


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path="/" component={Register} />
            <Route path="/Home" exact component={Home} />
            <Route exact path="/login" component={Login} />

          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
