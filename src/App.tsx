import './App.css';
import Login from './containers/login';
import { Provider } from 'react-redux'
import store from './store';
import { ThemeProvider } from '@mui/system';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AccountList from './containers/account/AccountList';
import AccountDetail from './containers/account/accountDetail';
import Header from './containers/header';
import Configuration from './containers/configuration';
import { brandingDarkTheme } from './theme/brandingTheme';
import Dashboard from './containers/dashboard';
import { CssBaseline } from '@mui/material';
if (window.location.pathname === '/') {
  window.location.pathname = '/app-login'
}
function App() {
  return (
    <ThemeProvider theme={brandingDarkTheme} >
      <CssBaseline />
      <Provider store={store}>
        {
        <Router>
            {window.location.pathname === '/app-login' && <Route exact path='/app-login' render={() => <Login email='john@1.com' password='123' />} />}
            <Route path='/' component={Header} /> 
            <Route exact path='/portal-configuration' component={Configuration} />
            <Route exact path='/app-user/:userId' component={Dashboard} />
            <Switch>
              <Route exact path='/app-account/:userId' component={AccountList} />
              <Route exact path='/app-account/:userId/individual-account/:accountId' component={AccountDetail} />
            </Switch>
        </Router>
        }
      </Provider>
    </ThemeProvider>
  );
}

export default App;
