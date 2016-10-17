import React from 'react';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import App from '../App';
import Home from './Home';
import NoMatch from './NoMatch';

export default (
  <Router history={browserHistory}>
    <Route component={App} path='/'>
      <IndexRoute component={Home} />
      <Route component={NoMatch} path="*" />
    </Route>
  </Router>
);
