import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Header from './components/header/header';
import Home from './components/pages/home';
import About from './components/pages/about';
import Location from './components/pages/location';
import LocationsList from './components/pages/locationslist';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/locations' component={LocationsList} />
          <Route exact path='/locations/:name' component={Location} />
        </div>
      </Router>
    );
  }
}

export default App;
