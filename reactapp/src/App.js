import React, { useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from './PrivateRouter';
import {AuthContext } from './context/auth';

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Edit from './components/Edit';

function App(props) {
  
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  function logOut() {
    localStorage.removeItem("tokens");
    setAuthTokens(null);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#" style={{color:'orange',fontWeight:'bold'}}>Authantication</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Login</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <button className="btn btn-info " onClick={logOut}>LogOut</button>
          </div>
        </nav>

        <div className="container py-5">
          <div className="row justify-content-center">
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute  exact path="/dashboard" component={Dashboard} />
          <PrivateRoute  exact path="/edit/:id" component={Edit} />
          {/* <Route path="/edit/:id" component={Edit} /> */}
          </div>
        </div>
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
