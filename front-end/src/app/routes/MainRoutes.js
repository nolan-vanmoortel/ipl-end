// @flow weak

import React            from 'react';
import {
  Route,
  Switch
 }                      from 'react-router';
import Home             from '../views/home';
import AdminDashboard   from '../views/adminDashboard';
import PrivateRoute     from '../components/privateRoute/PrivateRoute';
import Protected        from '../views/protected';
import PageNotFound     from '../views/pageNotFound';
import ReportForm       from '../views/reportForm';
import Login            from '../views/login';
import PrintQr          from '../views/printQr';
const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/report/:machineName" component={ReportForm} />
      <PrivateRoute path="/adminDashboard" component={AdminDashboard} />
      <Route exact path="/login" component={Login} />
      <Route path="/qr/:machineName" component={PrintQr} />
      <PrivateRoute path="/protected" component={Protected} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
