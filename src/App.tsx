import React from 'react';
import './App.css';
import Login from './containers/login';
import { Provider } from 'react-redux'
import store from './store';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme/customTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Login email='macina@1.com' password='123' />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
