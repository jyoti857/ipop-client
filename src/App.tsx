import './App.css';
import Login from './containers/login';
import { Provider } from 'react-redux'
import store from './store';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme/customTheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AccountList from './containers/account/AccountList';
import AccountDetail from './containers/account/accountDetail';
import Header from './containers/header';
import Configuration from './containers/configuration';
import Dashboard from './containers/dashboard';
import Pages from './containers/header/pages';
import { useEffect, useState } from 'react';
import { brandingDarkTheme } from './theme/brandingTheme';
// import { Dashboard } from '@mui/icons-material';
if (window.location.pathname === '/') {
  window.location.pathname = '/app-login'
}
function App() {
  // if (window.location.pathname === '/app-login') {
  //   return null;
  // }
  // const [path_, setPath_] = useState(window.location.pathname);
  // useEffect(() => {
  //   setPath_(window.location.pathname)
  // }, [path_])
  return (
    <ThemeProvider theme={brandingDarkTheme} >
      {/* //{theme}> */}
      <Provider store={store}>
        {
        <Router>
            {window.location.pathname === '/app-login' && <Route exact path='/app-login' render={() => <Login email='john@1.com' password='123' />} />}
            <Route path='/' component={Header} /> 
            <Route exact path='/portal-configuration' component={Configuration} />
            <Switch>
              <Route exact path='/app-account/:userId' component={AccountList} />
              {/* <Route path='/account/:id' component={AccountList} /> */}
              {/* <Header> */}
              <Route exact path='/app-account/:userId/individual-account/:accountId' component={AccountDetail} />
              {/* </Header> */}
            </Switch>
        </Router>
        }
        {/* <Login email='macina@1.com' password='123' />  */}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
