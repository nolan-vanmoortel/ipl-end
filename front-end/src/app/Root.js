// @flow

import React, {
  Component
}                               from 'react';
import {
  Switch,
  Route
}                               from 'react-router-dom';
import { ConnectedRouter }      from 'react-router-redux';
import { Provider }             from 'react-redux';
import configureStore           from './redux/store/configureStore';
import { history }              from './redux/store/configureStore';
import App                      from './containers/app';
import ScrollTop                from './components/scrollToTop/ScrollToTop';
import Login                    from './views/login';
import LogoutRoute              from './components/logoutRoute/LogoutRoute';

type Props = any;
type State = any;

const store = configureStore();

class Root extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <ScrollTop>
              <Switch>
                <App />
                {/* logout: just redirects to login (App will take care of removing the token) */}
                <LogoutRoute path="/logout" />
              </Switch>
            </ScrollTop>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}
export default Root;
