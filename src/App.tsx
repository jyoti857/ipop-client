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
// import { Dashboard } from '@mui/icons-material';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Route exact path='/' render={() => <Login email='macina@1.com' password='123' />} />
            <Switch>
            {/* <Route path='/account/:id' component={AccountList} /> */}
            {/* <Header> */}
            <Route path='/account/app-dashboard/:id' component={Header} />
              <Route path='/app-account/:accountId' component={AccountDetail} />
            <Route path='/app-account/:accountId/configuration' component={Configuration} />
            {/* </Header> */}
          </Switch>
        </Router>
        {/* <Login email='macina@1.com' password='123' />  */}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
