import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    let { authTokens } = useAuth();
    let token = localStorage.getItem('tokens');
  return(
    <Route {...rest} render={(props) =>
        authTokens ?  (
            <Component {...props} />
        ):(
            token ? (<Component {...props} />):(<Redirect to="/" />)
            
        )}
    />
  );
}

export default PrivateRoute;