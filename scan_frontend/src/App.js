import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { CalendarContextProvider } from './context/CalendarContext';

function App() {
  return (
    <CalendarContextProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </CalendarContextProvider>
  );
}

export default App;
