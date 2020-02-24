import React, { useState } from 'react';

import { Link, Redirect  } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/auth";

    function Login(){
        const [isLoggedIn, setLoggedIn] = useState(false);
        const [isError, setIsError] = useState(false);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const { setAuthTokens } = useAuth();

        function postLogin() {
            axios.post("http://localhost:4000/api/user/login", {
              email,
              password
            }).then(response => {
                if (response.data.success == 1) {
                    setAuthTokens(response.data.token);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            }).catch(e => {
              setIsError(true);
            });

           
        }

        if (isLoggedIn) {
            return <Redirect to="/dashboard" />;
        }

        return(
            <div className="card text-center w-50">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <div className="form-row justify-content-center">
                        <div className="form-group ">
                        
                        <input className="form-control" 
                                type="email"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="Email"
                        />
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="form-group">
                            
                            <input className="form-control" 
                                   type="password"
                                   value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }} placeholder="password" 
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={postLogin}>Login</button> 
                </div>
                <div className="card-footer text-muted"> 
                    <Link to="/signup">Don't have an account?</Link>
                </div>
                    { isError &&<div className="alert alert-warning" role="alert">The username or password provided were incorrect!</div> }
            </div>
        )
    }


export default Login;