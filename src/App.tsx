import './App.css';
import Login from './containers/login';
import { Provider } from 'react-redux'
import store from './store';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme/customTheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AccountList from './containers/account/AccountList';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
          <Route path='/' exact component={AccountList} />
          <Switch>
            <Route path='/login' render={() => <Login email='macina@1.com' password='123' />} />
          </Switch>
          </Router>
        {/* <Login email='macina@1.com' password='123' />  */}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
